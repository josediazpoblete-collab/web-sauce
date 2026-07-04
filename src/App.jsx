import { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Minus, ShoppingBasket, MapPin, Clock, X, RefreshCw, Search, ChevronRight } from "lucide-react";

// ─── CONFIGURACIÓN ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "56966118435";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7OmZkyb6trWTd7YYLBF9xKhGJRA8As2H_i8fNmsLTzXZpFZO6MgnF36mwk2rKQpT0QjgP6miiFzyo/pub?gid=215243576&single=true&output=csv";

const MASCOT_SRC = "data:image/jpeg;base64,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";

const BG_PHOTOS = [
  "/fotos/local6.jpg",
  "/fotos/local1.jpg",
  "/fotos/local5.jpg",
  "/fotos/local3.jpg",
  "/fotos/local2.jpg",
  "/fotos/local4.jpg",
];

// ─── ICONOS POR CATEGORÍA ────────────────────────────────────────────────────
const CAT_ICONS = {
  "abarrotes":"🥫","almacen":"🥫","almacén":"🥫",
  "libreria":"✏️","librería":"✏️",
  "helados":"🍦","bebidas":"🥤",
  "verduleria":"🥬","verdulería":"🥬",
  "ensaladas":"🥗","fiambres":"🧀","pan":"🍞",
  "carnes":"🥩","lacteos":"🥛","lácteos":"🥛",
  "limpieza":"🧹","aseo":"🧴","snacks":"🍿",
  "condimentos":"🧂","mascotas":"🐾",
  "ferreteria":"🔧","ferretería":"🔧",
};

const CAT_MAP = {
  "almacén":"almacen","almacen":"almacen",
  "abarrotes":"abarrotes",
  "librería":"libreria","libreria":"libreria",
  "helados":"helados","bebidas":"bebidas",
  "verdulería":"verduleria","verduleria":"verduleria",
  "ensaladas":"ensaladas","fiambres":"fiambres","pan":"pan",
  "carnes":"carnes","lácteos":"lacteos","lacteos":"lacteos",
  "limpieza":"limpieza","aseo":"aseo","snacks":"snacks",
  "condimentos":"condimentos","mascotas":"mascotas",
  "ferretería":"ferreteria","ferreteria":"ferreteria",
};

// ─── PRODUCTOS RESPALDO ───────────────────────────────────────────────────────
const PRODUCTOS_RESPALDO = [
  { id:1,  cat:"abarrotes", name:"Aceite Chef 1L",         price:2990, unit:"un", stock:null, imagen:"", notes:"" },
  { id:2,  cat:"abarrotes", name:"Arroz Tucapel 1kg",      price:1590, unit:"un", stock:null, imagen:"", notes:"" },
  { id:3,  cat:"abarrotes", name:"Azúcar Iansa 1kg",       price:1490, unit:"un", stock:null, imagen:"", notes:"" },
  { id:4,  cat:"bebidas",   name:"Coca-Cola 1.5L",         price:1990, unit:"un", stock:null, imagen:"", notes:"" },
  { id:5,  cat:"bebidas",   name:"Agua mineral 1.5L",      price:990,  unit:"un", stock:null, imagen:"", notes:"" },
  { id:6,  cat:"pan",       name:"Hallulla",               price:1500, unit:"kg", stock:null, imagen:"", notes:"" },
  { id:7,  cat:"pan",       name:"Marraqueta",             price:1500, unit:"kg", stock:null, imagen:"", notes:"" },
  { id:8,  cat:"pan",       name:"Tortilla de rescoldo",   price:1990, unit:"un", stock:null, imagen:"", notes:"Receta propia" },
];

// ─── UTILIDADES ───────────────────────────────────────────────────────────────
const CLP = (n) => n.toLocaleString("es-CL", { style:"currency", currency:"CLP", maximumFractionDigits:0 });
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
const firstValue = (...values) => values.find(v => String(v ?? "").trim() !== "") ?? "";

const parseMoney = (value) => {
  if (!value) return 0;
  const cleaned = String(value).replace(/[$\s.]/g,"").replace(",",".");
  return Number(cleaned) || 0;
};

const parseStock = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const parsed = Number(raw.replace(/[^\d,.-]/g,"").replace(",","."));
  if (!Number.isFinite(parsed)) return null;
  return Math.max(0, Math.floor(parsed));
};

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/[^a-z]/g,""));
  return lines.slice(1).map(line => {
    const cols = []; let cur = "", inQ = false;
    for (const ch of line) {
      if (ch==='"') { inQ=!inQ; }
      else if (ch===","&&!inQ) { cols.push(cur); cur=""; }
      else { cur+=ch; }
    }
    cols.push(cur);
    const row = {};
    headers.forEach((h,i) => row[h]=(cols[i]||"").trim().replace(/^"|"$/g,""));
    const INACTIVE = ["no","n","false","0","agotado","agotada","sin stock","sinstock","inactivo","oculto","no disponible"];
    const availability = (firstValue(row.disponible, row.estado, row.activo, row.publicado) || "si").toLowerCase().trim();
    const stock = parseStock(firstValue(row.stock, row.cantidad, row.inventario, row.existencias));
    const isAvailable = !INACTIVE.includes(availability) && (stock === null || stock > 0);
    if (!row.nombre || !isAvailable) return null;
    const sheetImage = firstValue(row.imagen, row.foto, row.image, row.imageurl, row.urlimagen, row.linkimagen, row.imgbb);
    return {
      id:     Number(row.id) || 0,
      cat:    CAT_MAP[row.categoria?.toLowerCase()] || row.categoria?.toLowerCase(),
      name:   row.nombre,
      price:  parseMoney(row.precio),
      unit:   row.unidad || "un",
      notes:  row.notas || "",
      stock,
      imagen: sheetImage?.trim() || "",
    };
  }).filter(Boolean);
}

// ─── FIELD ────────────────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, icon: Icon, textarea }) {
  return (
    <div>
      <label style={{fontSize:13,fontWeight:700,display:"block",marginBottom:6,color:"#1C2B1A"}}>{label}</label>
      <div style={{position:"relative"}}>
        {Icon && <Icon size={16} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF"}} />}
        {textarea ? (
          <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={2}
            style={{width:"100%",border:"2px solid #E5E7EB",borderRadius:12,padding:"10px 12px",fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit"}} />
        ) : (
          <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
            style={{width:"100%",border:"2px solid #E5E7EB",borderRadius:12,padding:"10px 12px",paddingLeft:Icon?38:12,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}} />
        )}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function ElSauceStore() {
  const [activeCat, setActiveCat]       = useState("abarrotes");
  const [search, setSearch]             = useState("");
  const [cart, setCart]                 = useState({});
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sent, setSent]                 = useState(false);
  const [form, setForm]                 = useState({ nombre:"", direccion:"", horario:"", pago:"efectivo", notas:"" });
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [bgIndex, setBgIndex]           = useState(0);
  const catNavRef = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => setBgIndex(i => (i+1) % BG_PHOTOS.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const loadProducts = async () => {
    setLoading(true); setUsingFallback(false);
    try {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error();
      const text = await res.text();
      const parsed = parseCSV(text);
      if (!parsed.length) throw new Error();
      setProducts(parsed);
    } catch {
      setProducts(PRODUCTOS_RESPALDO);
      setUsingFallback(true);
    } finally { setLoading(false); }
  };
  useEffect(() => { loadProducts(); }, []);

  // Categorías dinámicas
  const categories = useMemo(() => {
    const seen = new Set(); const result = [];
    products.forEach(p => {
      if (p.cat && !seen.has(p.cat)) {
        seen.add(p.cat);
        result.push({ id: p.cat, label: capitalize(p.cat), icon: CAT_ICONS[p.cat] || "📦" });
      }
    });
    return result;
  }, [products]);

  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCat)) {
      setActiveCat(categories[0].id);
    }
  }, [categories]);

  const isSearching = search.trim().length > 0;
  const itemsInCat = useMemo(() => {
    if (isSearching) return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return products.filter(p => p.cat === activeCat);
  }, [activeCat, products, search, isSearching]);

  const cartList = useMemo(() =>
    Object.entries(cart).filter(([,qty])=>qty>0)
      .map(([id,qty])=>({...products.find(p=>p.id===Number(id)),qty})),
    [cart,products]);
  const total = cartList.reduce((s,i)=>s+i.price*i.qty, 0);
  const totalItems = cartList.reduce((s,i)=>s+i.qty, 0);

  const addQty = (id, delta) => setCart(prev => {
    const product = products.find(p => p.id === Number(id));
    const stockLimit = Number.isFinite(product?.stock) ? product.stock : null;
    const next = { ...prev };
    const current = next[id] || 0;
    const updated = Math.max(0, current + delta);
    const limited = stockLimit === null ? updated : Math.min(updated, stockLimit);
    if (limited === 0) delete next[id]; else next[id] = limited;
    return next;
  });

  const buildWhatsAppMessage = () => {
    const lines = [`*PEDIDO ALMACÉN EL SAUCE*`, ""];
    cartList.forEach(i => lines.push(`• ${i.qty} ${i.unit} — ${i.name} (${CLP(i.price*i.qty)})`));
    lines.push("", `*Total: ${CLP(total)}*`, "",
      `Nombre: ${form.nombre}`, `Dirección: ${form.direccion}`,
      `Horario: ${form.horario || "Lo antes posible"}`,
      `Pago: ${form.pago === "efectivo" ? "Efectivo" : "Débito/Crédito al recibir"}`);
    if (form.notas) lines.push(`Notas: ${form.notas}`);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleConfirm = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, "_blank");
    setSent(true);
  };

  const resetOrder = () => {
    setCart({}); setForm({ nombre:"", direccion:"", horario:"", pago:"efectivo", notas:"" });
    setSent(false); setCheckoutOpen(false); setDrawerOpen(false);
  };

  const S = {
    // tokens
    verde: "#1C2B1A",
    marfil: "#F7F3EC",
    rojo: "#B8341B",
    mostaza: "#D4A843",
    blanco: "#FFFFFF",
    gris: "#6B7280",
    borde: "#E5E7EB",
  };

  return (
    <div style={{minHeight:"100vh",background:S.marfil,fontFamily:"'Inter',system-ui,sans-serif",color:S.verde}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cat-pill { display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:999px;font-size:13px;font-weight:700;white-space:nowrap;cursor:pointer;border:2px solid transparent;transition:all .2s; }
        .cat-pill.active { background:${S.verde};color:${S.blanco}; }
        .cat-pill.inactive { background:${S.blanco};color:${S.verde};border-color:${S.borde}; }
        .cat-pill.inactive:hover { border-color:${S.verde}; }
        .prod-card { background:${S.blanco};border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);transition:box-shadow .2s;display:flex;flex-direction:column; }
        .prod-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.12); }
        .btn-add { width:100%;background:${S.rojo};color:${S.blanco};border:none;border-radius:10px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:filter .15s; }
        .btn-add:hover { filter:brightness(1.1); }
        .btn-add:disabled { opacity:.4;cursor:not-allowed; }
        .qty-row { display:flex;align-items:center;justify-content:space-between;background:${S.verde};border-radius:10px;padding:4px 8px; }
        .qty-btn { background:none;border:none;color:${S.blanco};cursor:pointer;padding:6px;border-radius:8px;display:flex;align-items:center;transition:background .15s; }
        .qty-btn:hover { background:rgba(255,255,255,.15); }
        .qty-btn:disabled { opacity:.35;cursor:not-allowed; }
        .btn-wa { width:100%;background:#25D366;color:${S.blanco};border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;transition:filter .15s; }
        .btn-wa:hover { filter:brightness(1.05); }
        .btn-wa:disabled { opacity:.4;cursor:not-allowed; }
        .pago-btn { flex:1;padding:10px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;border:2px solid ${S.borde};background:${S.blanco};color:${S.verde};transition:all .15s; }
        .pago-btn.selected { background:${S.verde};color:${S.blanco};border-color:${S.verde}; }
        ::-webkit-scrollbar { width:4px;height:4px; }
        ::-webkit-scrollbar-thumb { background:#D1D5DB;border-radius:4px; }
      `}</style>

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div style={{position:"relative",height:220,overflow:"hidden"}}>
        {BG_PHOTOS.map((src,i) => (
          <div key={src} style={{
            position:"absolute",inset:0,
            backgroundImage:`url(${src})`,
            backgroundSize:"cover",backgroundPosition:"center",
            opacity: i === bgIndex ? 1 : 0,
            transition:"opacity 1.2s ease",
          }} />
        ))}
        {/* Overlay degradado */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(28,43,26,.55) 0%, rgba(28,43,26,.75) 100%)"}} />
        {/* Contenido hero */}
        <div style={{position:"relative",zIndex:1,height:"100%",display:"flex",alignItems:"center",padding:"0 20px",maxWidth:1200,margin:"0 auto"}}>
          <img src={MASCOT_SRC} alt="Mascota El Sauce"
            style={{width:72,height:72,borderRadius:"50%",objectFit:"cover",border:"3px solid "+S.mostaza,flexShrink:0,marginRight:16}} />
          <div>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:S.blanco,lineHeight:1.1,letterSpacing:"-0.5px"}}>
              Almacén El Sauce
            </p>
            <p style={{color:"rgba(255,255,255,.75)",fontSize:13,marginTop:4}}>
              Chépica · Delivery a domicilio
            </p>
          </div>
          {/* Boleta btn */}
          <button onClick={()=>setDrawerOpen(true)}
            style={{marginLeft:"auto",position:"relative",background:S.mostaza,color:S.verde,border:"none",borderRadius:12,padding:"10px 16px",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
            <ShoppingBasket size={20} />
            <span style={{display:"none"}} className="sm-show">Mi boleta</span>
            {totalItems > 0 && (
              <span style={{position:"absolute",top:-8,right:-8,background:S.rojo,color:S.blanco,borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
        {/* Dots indicador */}
        <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5,zIndex:1}}>
          {BG_PHOTOS.map((_,i) => (
            <button key={i} onClick={()=>setBgIndex(i)}
              style={{width:i===bgIndex?20:6,height:6,borderRadius:3,background:i===bgIndex?S.mostaza:"rgba(255,255,255,.5)",border:"none",cursor:"pointer",transition:"all .3s",padding:0}} />
          ))}
        </div>
      </div>

      {/* ── BUSCADOR ─────────────────────────────────────────────────────────── */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"16px 16px 0"}}>
        <div style={{position:"relative"}}>
          <Search size={16} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:S.gris}} />
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Buscar producto..."
            style={{width:"100%",background:S.blanco,border:"2px solid "+S.borde,borderRadius:12,padding:"11px 40px 11px 40px",fontSize:14,outline:"none",fontFamily:"inherit",color:S.verde}}
          />
          {search && (
            <button onClick={()=>setSearch("")}
              style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:S.gris,display:"flex"}}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── CATEGORÍAS ───────────────────────────────────────────────────────── */}
      {!isSearching && (
        <div ref={catNavRef} style={{overflowX:"auto",padding:"12px 16px",maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",gap:8,minWidth:"max-content"}}>
            {categories.map(c => (
              <button key={c.id} onClick={()=>setActiveCat(c.id)}
                className={`cat-pill ${activeCat===c.id?"active":"inactive"}`}>
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTENIDO PRINCIPAL ──────────────────────────────────────────────── */}
      <main style={{maxWidth:1200,margin:"0 auto",padding:"8px 16px 100px"}}>

        {/* Aviso fallback */}
        {usingFallback && (
          <div style={{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
            <p style={{fontSize:12,color:"#92400E"}}>Sin conexión — mostrando catálogo de ejemplo.</p>
            <button onClick={loadProducts} style={{fontSize:12,fontWeight:700,color:"#92400E",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
              <RefreshCw size={12}/> Reintentar
            </button>
          </div>
        )}

        {/* Título sección */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:S.verde}}>
            {isSearching
              ? `Resultados para "${search}"`
              : `${categories.find(c=>c.id===activeCat)?.icon || ""} ${categories.find(c=>c.id===activeCat)?.label || ""}`
            }
          </h2>
          {isSearching && <span style={{fontSize:12,color:S.gris}}>{itemsInCat.length} encontrados</span>}
        </div>

        {/* Spinner */}
        {loading && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",gap:12,color:S.gris}}>
            <RefreshCw size={28} style={{animation:"spin 1s linear infinite"}} />
            <p style={{fontSize:14}}>Cargando catálogo...</p>
            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
          </div>
        )}

        {/* Sin productos */}
        {!loading && itemsInCat.length === 0 && (
          <div style={{textAlign:"center",padding:"60px 0",color:S.gris}}>
            <p style={{fontSize:32,marginBottom:8}}>🔍</p>
            <p style={{fontSize:14}}>{isSearching ? `No encontramos "${search}"` : "Sin productos en esta categoría"}</p>
          </div>
        )}

        {/* Grid productos */}
        {!loading && itemsInCat.length > 0 && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
            {itemsInCat.map(p => {
              const qty = cart[p.id] || 0;
              const maxReached = Number.isFinite(p.stock) && qty >= p.stock;
              return (
                <div key={p.id} className="prod-card">
                  {/* Imagen */}
                  <div style={{width:"100%",height:140,background:"#F3F4F6",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                    {p.imagen ? (
                      <img src={p.imagen} alt={p.name}
                        style={{width:"100%",height:"100%",objectFit:"contain",padding:8}}
                        onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
                      />
                    ) : null}
                    <div style={{display:p.imagen?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",fontSize:40}}>
                      {CAT_ICONS[p.cat] || "📦"}
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{padding:"10px 10px 12px",flex:1,display:"flex",flexDirection:"column",gap:4}}>
                    <p style={{fontSize:13,fontWeight:600,lineHeight:1.3,color:S.verde}}>{p.name}</p>
                    <p style={{fontSize:11,color:S.gris}}>por {p.unit}</p>
                    {Number.isFinite(p.stock) && p.stock <= 10 && (
                      <p style={{fontSize:11,color:S.rojo,fontWeight:700}}>⚠️ {p.stock} disponibles</p>
                    )}
                    {p.notes && <p style={{fontSize:11,color:S.gris,fontStyle:"italic"}}>{p.notes}</p>}
                    <p style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:S.rojo,marginTop:4}}>{CLP(p.price)}</p>
                    <div style={{marginTop:8}}>
                      {qty === 0 ? (
                        <button className="btn-add" disabled={maxReached} onClick={()=>addQty(p.id,1)}>
                          <Plus size={14}/> Agregar
                        </button>
                      ) : (
                        <div className="qty-row">
                          <button className="qty-btn" onClick={()=>addQty(p.id,-1)}><Minus size={14}/></button>
                          <span style={{color:"#fff",fontWeight:700,fontSize:14}}>{qty}</span>
                          <button className="qty-btn" disabled={maxReached} onClick={()=>addQty(p.id,1)}><Plus size={14}/></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── BARRA FLOTANTE ───────────────────────────────────────────────────── */}
      {totalItems > 0 && !drawerOpen && (
        <button onClick={()=>setDrawerOpen(true)}
          style={{position:"fixed",bottom:16,left:16,right:16,maxWidth:480,margin:"0 auto",background:S.verde,color:S.blanco,border:"none",borderRadius:16,padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 8px 24px rgba(28,43,26,.35)",cursor:"pointer",zIndex:30,fontFamily:"inherit"}}>
          <span style={{fontWeight:700,fontSize:14}}>{totalItems} producto{totalItems!==1?"s":""}</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>{CLP(total)}</span>
        </button>
      )}

      {/* ── DRAWER BOLETA ────────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div style={{position:"fixed",inset:0,zIndex:40,display:"flex",justifyContent:"flex-end"}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.45)"}} onClick={()=>setDrawerOpen(false)} />
          <div style={{position:"relative",width:"100%",maxWidth:420,background:S.blanco,height:"100%",overflowY:"auto",display:"flex",flexDirection:"column",boxShadow:"-8px 0 32px rgba(0,0,0,.15)"}}>
            <div style={{background:S.verde,color:S.blanco,padding:"20px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700}}>Tu boleta</p>
              <button onClick={()=>setDrawerOpen(false)} style={{background:"none",border:"none",color:S.blanco,cursor:"pointer",display:"flex"}}><X size={22}/></button>
            </div>
            <div style={{flex:1,padding:20}}>
              {cartList.length === 0 ? (
                <div style={{textAlign:"center",paddingTop:48,color:S.gris}}>
                  <ShoppingBasket size={40} style={{margin:"0 auto 12px",opacity:.4}} />
                  <p style={{fontSize:14}}>Nada agregado todavía.</p>
                </div>
              ) : (
                <div>
                  <p style={{fontSize:11,fontWeight:700,color:S.gris,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>— Almacén El Sauce —</p>
                  {cartList.map(i => (
                    <div key={i.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px dashed "+S.borde,gap:8}}>
                      <div style={{flex:1}}>
                        <p style={{fontSize:13,fontWeight:600}}>{i.name}</p>
                        <p style={{fontSize:11,color:S.gris}}>{i.qty} {i.unit} × {CLP(i.price)}</p>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <button className="qty-btn" style={{background:S.verde,borderRadius:8}} onClick={()=>addQty(i.id,-1)}><Minus size={13}/></button>
                        <span style={{fontWeight:700,minWidth:16,textAlign:"center",fontSize:14}}>{i.qty}</span>
                        <button className="qty-btn" style={{background:S.verde,borderRadius:8}}
                          disabled={Number.isFinite(i.stock) && i.qty >= i.stock}
                          onClick={()=>addQty(i.id,1)}><Plus size={13}/></button>
                      </div>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:16,marginTop:4}}>
                    <p style={{fontWeight:700,fontSize:15}}>TOTAL</p>
                    <p style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:S.rojo}}>{CLP(total)}</p>
                  </div>
                </div>
              )}
            </div>
            {cartList.length > 0 && (
              <div style={{padding:"16px 20px",borderTop:"1px solid "+S.borde}}>
                <button onClick={()=>setCheckoutOpen(true)} className="btn-add" style={{borderRadius:12,padding:14,fontSize:15}}>
                  Continuar pedido <ChevronRight size={18}/>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CHECKOUT ─────────────────────────────────────────────────────────── */}
      {checkoutOpen && (
        <div style={{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.55)"}} onClick={()=>!sent&&setCheckoutOpen(false)} />
          <div style={{position:"relative",background:S.blanco,borderRadius:20,width:"100%",maxWidth:440,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.25)"}}>
            {!sent ? (
              <>
                <div style={{background:S.verde,color:S.blanco,padding:"20px 20px",borderRadius:"20px 20px 0 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700}}>Datos de entrega</p>
                  <button onClick={()=>setCheckoutOpen(false)} style={{background:"none",border:"none",color:S.blanco,cursor:"pointer",display:"flex"}}><X size={20}/></button>
                </div>
                <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
                  <Field label="Nombre" value={form.nombre} onChange={v=>setForm({...form,nombre:v})} placeholder="Tu nombre" />
                  <Field label="Dirección" value={form.direccion} onChange={v=>setForm({...form,direccion:v})} placeholder="Calle, número, referencia" icon={MapPin} />
                  <Field label="Horario preferido" value={form.horario} onChange={v=>setForm({...form,horario:v})} placeholder="Ej: hoy entre 18 y 20h" icon={Clock} />
                  <div>
                    <label style={{fontSize:13,fontWeight:700,display:"block",marginBottom:6,color:S.verde}}>Forma de pago al recibir</label>
                    <div style={{display:"flex",gap:8}}>
                      {[{id:"efectivo",label:"Efectivo"},{id:"pos",label:"Débito/Crédito"}].map(opt=>(
                        <button key={opt.id} className={`pago-btn ${form.pago===opt.id?"selected":""}`}
                          onClick={()=>setForm({...form,pago:opt.id})}>{opt.label}</button>
                      ))}
                    </div>
                  </div>
                  <Field label="Notas (opcional)" value={form.notas} onChange={v=>setForm({...form,notas:v})} placeholder="Ej: tomates maduros, sin cilantro..." textarea />
                  <div style={{background:"#F3F4F6",borderRadius:12,padding:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontWeight:600,fontSize:14}}>Total a pagar</span>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:S.rojo}}>{CLP(total)}</span>
                  </div>
                  <button className="btn-wa" disabled={!form.nombre||!form.direccion} onClick={handleConfirm}>
                    Enviar pedido por WhatsApp
                  </button>
                  {(!form.nombre||!form.direccion) && (
                    <p style={{fontSize:12,textAlign:"center",color:S.gris}}>Completá nombre y dirección para continuar</p>
                  )}
                </div>
              </>
            ) : (
              <div style={{padding:40,textAlign:"center"}}>
                <img src={MASCOT_SRC} alt="Mascota" style={{width:88,height:88,borderRadius:"50%",objectFit:"cover",border:"4px solid "+S.mostaza,margin:"0 auto 16px"}} />
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:S.verde,marginBottom:8}}>¡Pedido enviado!</p>
                <p style={{fontSize:13,color:S.gris,lineHeight:1.6,marginBottom:20}}>Se abrió WhatsApp con el detalle de su pedido. El almacén le confirma cuando esté en camino.</p>
                <button className="btn-add" style={{borderRadius:12,padding:14}} onClick={resetOrder}>
                  Hacer otro pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer style={{textAlign:"center",padding:"20px 0 80px",fontSize:12,color:S.gris}}>
        Almacén El Sauce · Chépica, Colchagua
      </footer>
    </div>
  );
}
