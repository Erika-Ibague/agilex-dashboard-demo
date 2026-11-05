(function(root){
'use strict';
const DAY=86400000,EPOCH=25569;
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const num=(v,where='importe')=>{if(v===null||v===undefined||v==='')return 0;const n=typeof v==='number'?v:Number(String(v).trim());if(!Number.isFinite(n))throw new Error('Valor numérico inválido en '+where);return n;};
const min=arr=>{const a=arr.filter(x=>typeof x==='number'&&x>0);return a.length?Math.min(...a):null;};
const serial=iso=>Math.floor(Date.parse(iso+'T00:00:00Z')/DAY)+EPOCH;
const iso=n=>typeof n==='number'&&n>0?new Date(Math.round((n-EPOCH)*DAY)).toISOString().slice(0,10):null;
const related=(table,id)=>table.filter(r=>r.ID_Cliente===id);
const dateAlert=(date,cut,p)=>!date?'SIN FECHA':date<cut?'VENCIDO':date-cut<=p.urgente_dias?'URGENTE':date-cut<=p.proximo_dias?'PRÓXIMO':'VIGENTE';
const currency=(value,money,rate,where)=>{value=num(value,where);if(!value)return 0;if(money==='COP')return value;if(money==='USD')return value*rate;throw new Error('Moneda no soportada en '+where+': '+money);};
function normalizeCosts(input){
 const need=['operaciones','costos','adicionales'];for(const n of need)if(!Array.isArray(input?.[n]))throw new Error('Falta la tabla de '+n);
 const operations=input.operaciones.map(o=>({...o,TRM:num(o.TRM,'TRM de '+o.DO),Fecha:num(o.Fecha,'fecha de '+o.DO)}));const ids=new Set();
 for(const o of operations){if(!o.DO||!o.ID_Cliente)throw new Error('Una operación no tiene ID_Cliente o DO.');if(ids.has(o.DO))throw new Error('DO duplicado: '+o.DO);ids.add(o.DO);if(o.TRM<=0)throw new Error('Falta TRM positiva en '+o.DO);}
 const map=new Map(operations.map(o=>[o.DO,o]));
 for(const line of [...input.costos,...input.adicionales]){const o=map.get(line.DO);if(!o)throw new Error('DO no encontrado: '+line.DO);if(o.ID_Cliente!==line.ID_Cliente)throw new Error('Cliente y DO no coinciden: '+line.DO);}
 const costs=input.costos.map(c=>{const o=map.get(c.DO);const agil=currency(c.ValorAgil,c.MonedaAgil,o.TRM,c.DO),client=currency(c.ValorCliente,c.MonedaCliente,o.TRM,c.DO);return {...c,TRM:o.TRM,agilCOP:agil,clienteCOP:client,totalCOP:agil+client};});
 const seen=new Set();const extras=input.adicionales.map(a=>{if(a.ID_Evento&&seen.has(a.ID_Evento))throw new Error('Adicional duplicado: '+a.ID_Evento);seen.add(a.ID_Evento);const o=map.get(a.DO),value=currency(a.Valor,a.Moneda,o.TRM,a.DO),included=a.Estado!=='Rechazado',payer=a.QuienAsume;return {...a,TRM:o.TRM,valorCOP:value,incluidoCOP:included?value:0,agilCOP:included&&payer==='ÁgilCargo'?value:0,clienteCOP:included&&payer==='Cliente (pago directo al aliado)'?value:0,porDefinirCOP:included&&payer==='Por definir'?value:0};});
 for(const a of extras)if(!['ÁgilCargo','Cliente (pago directo al aliado)','Por definir'].includes(a.QuienAsume))throw new Error('Responsable del costo sin reconocer en '+a.DO);
 return {meta:input.meta||{},operaciones:operations.map(o=>{const lines=costs.filter(c=>c.DO===o.DO),ex=extras.filter(a=>a.DO===o.DO),sum=k=>ex.reduce((s,x)=>s+x[k],0),baseAgil=lines.reduce((s,x)=>s+x.agilCOP,0),baseCliente=lines.reduce((s,x)=>s+x.clienteCOP,0),extraAgil=sum('agilCOP'),extraCliente=sum('clienteCOP'),unknown=sum('porDefinirCOP'),total=baseAgil+baseCliente+extraAgil+extraCliente+unknown;return {...o,lineas:lines,adicionales:ex,baseAgilCOP:baseAgil,baseClienteCOP:baseCliente,adicionalAgilCOP:extraAgil,adicionalClienteCOP:extraCliente,porDefinirCOP:unknown,adicionalesCOP:sum('incluidoCOP'),rechazadosCOP:ex.filter(a=>a.Estado==='Rechazado').reduce((s,x)=>s+x.valorCOP,0),agilCOP:baseAgil+extraAgil,clienteCOP:baseCliente+extraCliente,totalCOP:total};}),costos:costs,adicionales:extras};
}
function build(base,costInput){
 if(!base?.tables?.CLIENTES?.length)throw new Error('La base no contiene clientes.');
 const T=base.tables,p={urgente_dias:60,proximo_dias:90,margen_tramite_dias:10,ciclo_revision_dias:334,...base.meta.parametros},cut=serial(base.meta.fecha_corte),cy=p.ciclo_revision_dias;
 if(!Number.isFinite(cut))throw new Error('Falta fecha de corte de la base de clientes.');
 for(const n of ['CONTACTOS','PRODUCTOS','PERMISOS','DOCUMENTOS','VINCULACIONES','FACTURACION','ALIADOS','BITACORA'])T[n]??=[];
 const costs=normalizeCosts(costInput),ids=new Set();for(const c of T.CLIENTES){if(!c.ID_Cliente||ids.has(c.ID_Cliente))throw new Error('ID_Cliente vacío o duplicado.');ids.add(c.ID_Cliente);}
 for(const o of costs.operaciones)if(!ids.has(o.ID_Cliente))throw new Error('La ruta '+o.DO+' pertenece a un cliente que no está en la base.');
 const scenarios=new Map((base.meta.escenarios||[]).map(s=>[s.id,s]));
 const clients=T.CLIENTES.map(c=>{
  const id=c.ID_Cliente,perm=related(T.PERMISOS,id).map(r=>{const next=r['Última verificación']?num(r['Última verificación'])+cy:null,due=r['Fecha de vencimiento']||null,control=r['Estado del trámite']==='No aplica'||r['Tipo de vigencia']==='Por operación'?null:min([due,next]),start=due&&r['Tiempo estándar de trámite (días)']!==null?due-num(r['Tiempo estándar de trámite (días)'])-p.margen_tramite_dias:null;let alert=dateAlert(control,cut,p);if(control>=cut&&start&&start<=cut&&r['Estado del trámite']!=='En renovación')alert='URGENTE';return {...r,control,inicioRenovacion:start,alert};});
  const docs=related(T.DOCUMENTOS,id).map(r=>{const effective=min([r['Fecha de vencimiento propia'],r['Fecha del documento']&&r['Vigencia máx. aceptada (días)']?num(r['Fecha del documento'])+num(r['Vigencia máx. aceptada (días)']):null]),control=r.Estado==='No aplica'?null:min([r['Última actualización']?num(r['Última actualización'])+cy:null,effective]);return {...r,control,alert:dateAlert(control,cut,p)};});
  const links=related(T.VINCULACIONES,id).map(r=>{const a=T.ALIADOS.find(a=>a.Aliado===r.Aliado),control=r['Estado de la vinculación']==='Terminada'?null:min([r['Fecha de vencimiento'],r['Última actualización']?num(r['Última actualización'])+cy:null]);return {...r,control,alert:a?.['Estado del aliado']==='Suspendido'&&r['Estado de la vinculación']==='Activa'?'ALIADO SUSPENDIDO':dateAlert(control,cut,p)};});
  const contacts=related(T.CONTACTOS,id).map(r=>{const control=r.Estado==='Retirado'?null:min([r['Vigencia de la autorización'],r['Última verificación']?num(r['Última verificación'])+cy:null]);return {...r,control,alert:dateAlert(control,cut,p)};});
  const finance=related(T.FACTURACION,id).map(r=>{const control=r['Datos bancarios verificados']==='Sí'&&r['Fecha de verificación bancaria']?num(r['Fecha de verificación bancaria'])+cy:null;return {...r,control,alert:r['Datos bancarios verificados']!=='Sí'?'SIN VERIFICAR':dateAlert(control,cut,p)};});
  const checks=[...perm,...docs,...links],expired=checks.filter(r=>['VENCIDO','ALIADO SUSPENDIDO'].includes(r.alert)).length,urgent=checks.filter(r=>r.alert==='URGENTE').length,annual=c['Última actualización integral']?num(c['Última actualización integral'])+cy:null,critical=min([annual,...checks.map(r=>r.control)]),active=contacts.filter(r=>r.Estado==='Activo'),missingAreas=['Área: Operación','Área: Documentos','Área: Facturación','Área: Pagos'].filter(k=>!active.some(r=>r[k]==='Sí'));
  const reasons=[];let apt='SÍ';if(c['Estado del cliente']!=='Activo'){apt='NO';reasons.push('Cliente '+String(c['Estado del cliente']||'sin estado').toLowerCase());}if(expired){apt='NO';reasons.push(expired+' controles vencidos o con aliado suspendido');}if(c['Listas restrictivas – resultado']==='Coincidencia confirmada'){apt='NO';reasons.push('Coincidencia en listas confirmada');}
  const pending=[];if(urgent)pending.push(urgent+' controles urgentes');if(missingAreas.length)pending.push('Contacto pendiente: '+missingAreas.map(k=>k.replace('Área: ','')).join(', '));if(contacts.some(r=>r.alert==='VENCIDO'))pending.push('Autorización o verificación de contacto vencida');if(!finance.length||finance.some(r=>['VENCIDO','SIN VERIFICAR','SIN FECHA'].includes(r.alert)))pending.push('Validación bancaria pendiente o vencida');if(c['Listas restrictivas – resultado']!=='Sin coincidencias')pending.push('Revisión de listas pendiente');if(c['Nivel de riesgo']==='Alto')pending.push('Revisión adicional por riesgo alto');if(!annual||annual<cut)pending.push('Revisión integral pendiente');if(!perm.length&&related(T.PRODUCTOS,id).some(r=>r['¿Mercancía regulada?']==='Sí'))pending.push('Producto regulado sin permiso registrado');if(!docs.length||!links.length)pending.push('Faltan documentos o vinculaciones');if(pending.length&&apt!=='NO')apt='CONDICIONADO';reasons.push(...pending);
  const status=apt==='NO'?'ROJO':apt==='CONDICIONADO'?'NARANJA':critical&&critical-cut<=p.proximo_dias?'AMARILLO':'VERDE';
  return {id,name:c['Razón social'],city:c['Ciudad / sede principal'],owner:c['Responsable de importaciones (Ágilcargo)'],raw:c,status,apto:apt,reasons,date:critical,days:critical?critical-cut:null,ops:num(c['Operaciones en curso (#)']),scenario:scenarios.get(id),products:related(T.PRODUCTOS,id),permisos:perm,documentos:docs,vinculaciones:links,contactos:contacts,facturacion:finance,bitacora:related(T.BITACORA,id),rutas:costs.operaciones.filter(o=>o.ID_Cliente===id)};
 });
 return {base,costs,clients,cut,params:p,isDemo:clients.every(c=>/^DEMO/i.test(c.name||'')||/^DEMO/.test(c.raw['NIT / ID tributario']||''))};
}
function extractBase(sheets){
 const required=['CLIENTES','CONTACTOS','PRODUCTOS','PERMISOS','DOCUMENTOS','VINCULACIONES','FACTURACION'];if(required.some(n=>!sheets[n]))throw new Error('El Excel de clientes debe conservar las hojas '+required.join(', '));
 const params=sheets.PARAMETROS?.cells||{},cut=params.C5;if(typeof cut!=='number'||cut<=0)throw new Error('Falta fecha de corte calculada en PARAMETROS!C5. Recalcula y guarda el Excel.');
 const tables={};for(const n of [...required,'ALIADOS','PUERTOS','BITACORA'])tables[n]=sheets[n]?.records(4)||[];
 return {meta:{fecha_corte:iso(cut),parametros:{urgente_dias:num(params.C6||60),proximo_dias:num(params.C7||90),margen_tramite_dias:num(params.C8??10),ciclo_revision_dias:num(params.C9||334)}},tables};
}
function extractCosts(sheets){
 for(const n of ['Operaciones','Costos','Adicionales'])if(!sheets[n])throw new Error('El Excel de rutas debe incluir las tablas Operaciones, Costos y Adicionales de esta entrega.');
 const operaciones=sheets.Operaciones.records(4).map(r=>({ID_Cliente:r.ID_Cliente,Cliente:r.Cliente,DO:r.DO,Fecha:r.Fecha,Modalidad:r.Modalidad,Origen:r.Origen,Destino:r.Destino,Incoterm:r.Incoterm,TRM:r['TRM COP/USD'],Responsable:r.Responsable,Modelo:r.Modelo,Estado:r['Estado operación'],Observaciones:r.Observaciones,Soporte:r['Soporte / expediente']}));
 const costos=sheets.Costos.records(4).map(r=>({ID_Cliente:r.ID_Cliente,Cliente:r.Cliente,DO:r.DO,Fila:r['Fila formato'],Servicio:r.Servicio,Aliado:r['Asignación de aliado'],ConceptoAgil:r['Concepto costo ÁgilCargo'],MonedaAgil:r['Moneda ÁgilCargo'],ValorAgil:r['Valor ÁgilCargo'],ConceptoCliente:r['Concepto pago directo'],MonedaCliente:r['Moneda pago directo'],ValorCliente:r['Valor pago directo'],Observaciones:r.Observaciones}));
 const adicionales=sheets.Adicionales.records(4).map(r=>({ID_Evento:r.ID_Evento,ID_Cliente:r.ID_Cliente,Cliente:r.Cliente,DO:r.DO,Fecha:r.Fecha,Servicio:r.Servicio,Aliado:r.Aliado,Tipo:r['Tipo de registro'],Concepto:r.Concepto,Causa:r.Causa,QuienAsume:r['Quién asume el costo'],Moneda:r.Moneda,Valor:r.Valor,TipoSoporte:r['Tipo de soporte'],Soporte:r['N.° / enlace del soporte'],Estado:r.Estado,Observaciones:r.Observaciones,Posicion:r['Posición en operación']}));
 return {meta:{archivo_origen:'Excel cargado'},operaciones,costos,adicionales};
}
const api={build,normalizeCosts,extractBase,extractCosts,currency,serial,iso,norm};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AGILEX_ENGINE=api;
})(typeof window!=='undefined'?window:globalThis);
