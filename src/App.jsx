import { useState, useMemo, useEffect } from "react";
import { Plus, Minus, ShoppingBasket, MapPin, Clock, X, RefreshCw, Search } from "lucide-react";

// ─── CONFIGURACIÓN ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "56966118435"; // ← Cambia esto por tu número real

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7OmZkyb6trWTd7YYLBF9xKhGJRA8As2H_i8fNmsLTzXZpFZO6MgnF36mwk2rKQpT0QjgP6miiFzyo/pub?gid=215243576&single=true&output=csv";

const MASCOT_SRC = "data:image/jpeg;base64,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";

// ─── FOTOS DEL LOCAL (slideshow de fondo) ───────────────────────────────────
const BG_PHOTOS = [
  "/fotos/local6.jpg",
  "/fotos/local1.jpg",
  "/fotos/local5.jpg",
  "/fotos/local3.jpg",
  "/fotos/local2.jpg",
  "/fotos/local4.jpg",
];

// ─── CATEGORÍAS ─────────────────────────────────────────────────────────────
// Iconos por categoría — agregá nuevas categorías acá si querés un ícono específico
const CAT_ICONS = {
  "abarrotes": "🥫", "almacen": "🥫", "almacén": "🥫",
  "libreria": "✏️", "librería": "✏️",
  "helados": "🍦",
  "bebidas": "🥤",
  "verduleria": "🥬", "verdulería": "🥬",
  "ensaladas": "🥗",
  "fiambres": "🧀",
  "pan": "🍞",
  "carnes": "🥩",
  "lacteos": "🥛", "lácteos": "🥛",
  "limpieza": "🧹",
  "snacks": "🍿",
  "condimentos": "🧂",
  "mascotas": "🐾",
  "ferreteria": "🔧", "ferretería": "🔧",
};

// Capitaliza primera letra
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

// Productos de respaldo (cuando no hay conexión a internet)
const PRODUCTOS_RESPALDO = [
  { id:1,  cat:"abarrotes",   name:"Aceite Chef 1L",         price:2990, unit:"un", stock:null, imagen:"" },
  { id:2,  cat:"abarrotes",   name:"Arroz Tucapel 1kg",      price:1590, unit:"un", stock:null, imagen:"" },
  { id:3,  cat:"abarrotes",   name:"Azúcar Iansa 1kg",       price:1490, unit:"un", stock:null, imagen:"" },
  { id:4,  cat:"abarrotes",   name:"Fideos Carozzi 400g",    price:990,  unit:"un", stock:null, imagen:"" },
  { id:5,  cat:"libreria",    name:"Cuaderno universitario", price:1990, unit:"un", stock:null, imagen:"" },
  { id:6,  cat:"libreria",    name:"Lápiz mina Bic",         price:350,  unit:"un", stock:null, imagen:"" },
  { id:7,  cat:"libreria",    name:"Set lápices de colores", price:2490, unit:"un", stock:null, imagen:"" },
  { id:8,  cat:"helados",     name:"Helado Bresler 1L",      price:3490, unit:"un", stock:null, imagen:"" },
  { id:9,  cat:"helados",     name:"Paleta de agua",         price:700,  unit:"un", stock:null, imagen:"" },
  { id:10, cat:"bebidas",     name:"Coca-Cola 1.5L",         price:1990, unit:"un", stock:null, imagen:"" },
  { id:11, cat:"bebidas",     name:"Agua mineral 1.5L",      price:990,  unit:"un", stock:null, imagen:"" },
  { id:12, cat:"bebidas",     name:"Jugo Watts 1L",          price:1290, unit:"un", stock:null, imagen:"" },
  { id:13, cat:"verduleria",  name:"Tomate",                 price:1490, unit:"kg", stock:null, imagen:"" },
  { id:14, cat:"verduleria",  name:"Palta",                  price:2990, unit:"kg", stock:null, imagen:"" },
  { id:15, cat:"verduleria",  name:"Cebolla",                price:990,  unit:"kg", stock:null, imagen:"" },
  { id:16, cat:"verduleria",  name:"Papa",                   price:790,  unit:"kg", stock:null, imagen:"" },
  { id:17, cat:"ensaladas",   name:"Ensalada chilena",       price:2490, unit:"250g", stock:null, imagen:"" },
  { id:18, cat:"ensaladas",   name:"Ensalada papa-mayo",     price:2690, unit:"250g", stock:null, imagen:"" },
  { id:19, cat:"fiambres",    name:"Jamón pierna",           price:5990, unit:"kg", stock:null, imagen:"" },
  { id:20, cat:"fiambres",    name:"Queso gauda",            price:7490, unit:"kg", stock:null, imagen:"" },
  { id:21, cat:"fiambres",    name:"Mortadela",              price:3990, unit:"kg", stock:null, imagen:"" },
  { id:22, cat:"pan",         name:"Hallulla",               price:1500, unit:"kg", stock:null, imagen:"" },
  { id:23, cat:"pan",         name:"Marraqueta",             price:1500, unit:"kg", stock:null, imagen:"" },
  { id:24, cat:"pan",         name:"Tortilla de rescoldo",   price:1990, unit:"un", stock:null, imagen:"" },
];

// ─── UTILIDADES ─────────────────────────────────────────────────────────────
const CLP = (n) =>
  n.toLocaleString("es-CL", { style:"currency", currency:"CLP", maximumFractionDigits:0 });

const CAT_MAP = {
  "almacén":"almacen","almacen":"almacen",
  "librería":"libreria","libreria":"libreria",
  "helados":"helados","bebidas":"bebidas",
  "verdulería":"verduleria","verduleria":"verduleria",
  "ensaladas":"ensaladas","fiambres":"fiambres","pan":"pan",
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
    return row;
  })
  .filter(r => {
    if (!r.nombre) return false;
    if (r.disponible?.toUpperCase() !== "SI") return false;
    // ocultar si stock es 0
    if (r.stock !== undefined && r.stock !== "" && Number(r.stock) === 0) return false;
    return true;
  })
  .map(r => ({
    id:     Number(r.id),
    cat:    CAT_MAP[r.categoria?.toLowerCase()] || r.categoria?.toLowerCase(),
    name:   r.nombre,
    price:  Number(r.precio)||0,
    unit:   r.unidad||"un",
    stock:  r.stock !== "" ? Number(r.stock) : null,
    imagen: r.imagen?.trim() || "",
  }));
}

// ─── COMPONENTE FIELD ────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, icon, textarea }) {
  return (
    <div>
      <label className="text-sm font-bold block mb-1.5">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40">{icon}</span>}
        {textarea ? (
          <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={2}
            className="w-full border-2 border-[#1A1A1A]/15 rounded-xl px-3 py-2.5 text-sm focus:border-[#7A2E1D] focus:outline-none transition resize-none" />
        ) : (
          <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
            className={`w-full border-2 border-[#1A1A1A]/15 rounded-xl py-2.5 text-sm focus:border-[#7A2E1D] focus:outline-none transition ${icon?"pl-9 pr-3":"px-3"}`} />
        )}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ───────────────────────────────────────────────────────────
export default function ElSauceStore() {
  const [activeCat, setActiveCat]     = useState("almacen");
  const [search, setSearch]           = useState("");
  const [cart, setCart]               = useState({});
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [checkoutOpen,setCheckoutOpen]= useState(false);
  const [sent, setSent]               = useState(false);
  const [form, setForm]               = useState({ nombre:"", direccion:"", horario:"", pago:"efectivo", notas:"" });
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [bgIndex, setBgIndex]         = useState(0);

  // Categorías dinámicas — se generan desde los productos cargados
  const categories = useMemo(() => {
    const seen = new Set();
    const result = [];
    products.forEach(p => {
      if (p.cat && !seen.has(p.cat)) {
        seen.add(p.cat);
        result.push({
          id: p.cat,
          label: capitalize(p.cat),
          icon: CAT_ICONS[p.cat] || "📦",
        });
      }
    });
    return result;
  }, [products]);

  // Si la categoría activa no existe en el nuevo set, volver a la primera
  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCat)) {
      setActiveCat(categories[0].id);
    }
  }, [categories]);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(i => (i + 1) % BG_PHOTOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setUsingFallback(false);
    try {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error("fetch failed");
      const text = await res.text();
      const parsed = parseCSV(text);
      if (parsed.length === 0) throw new Error("empty");
      setProducts(parsed);
    } catch {
      setProducts(PRODUCTOS_RESPALDO);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const isSearching = search.trim().length > 0;
  const itemsInCat = useMemo(() => {
    if (isSearching) {
      return products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return products.filter(p => p.cat === activeCat);
  }, [activeCat, products, search, isSearching]);
  const cartList   = useMemo(()=>
    Object.entries(cart).filter(([,qty])=>qty>0)
      .map(([id,qty])=>({...products.find(p=>p.id===Number(id)),qty})),
    [cart,products]);
  const total      = cartList.reduce((s,i)=>s+i.price*i.qty,0);
  const totalItems = cartList.reduce((s,i)=>s+i.qty,0);

  const addQty = (id,delta) => setCart(prev=>{
    const next={...prev}, cur=next[id]||0, upd=Math.max(0,cur+delta);
    if(upd===0) delete next[id]; else next[id]=upd;
    return next;
  });

  const buildWhatsAppMessage = () => {
    const lines=[`*PEDIDO ALMACÉN EL SAUCE*`,""];
    cartList.forEach(i=>lines.push(`• ${i.qty} ${i.unit} — ${i.name} (${CLP(i.price*i.qty)})`));
    lines.push("",`*Total: ${CLP(total)}*`,"",
      `Nombre: ${form.nombre}`,`Dirección: ${form.direccion}`,
      `Horario preferido: ${form.horario||"Lo antes posible"}`,
      `Forma de pago: ${form.pago==="efectivo"?"Efectivo":"Débito/Crédito (POS al entregar)"}`);
    if(form.notas) lines.push(`Notas: ${form.notas}`);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleConfirm = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`,"_blank");
    setSent(true);
  };

  const resetOrder = () => {
    setCart({}); setForm({nombre:"",direccion:"",horario:"",pago:"efectivo",notas:""});
    setSent(false); setCheckoutOpen(false); setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F2E8D5] text-[#1A1A1A]" style={{fontFamily:"'Nunito Sans',sans-serif"}}>

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#7A2E1D] text-[#F2E8D5] shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={MASCOT_SRC} alt="Mascota El Sauce"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-[#C9A227] bg-[#F2E8D5]" />
            <div>
              <h1 className="font-display text-xl sm:text-2xl tracking-wide leading-none" style={{fontFamily:"'Alfa Slab One',cursive"}}>ALMACÉN EL SAUCE</h1>
              <p className="text-xs sm:text-sm opacity-80 -mt-0.5">Chépica · Despacho a domicilio</p>
            </div>
          </div>
          <button onClick={()=>setDrawerOpen(true)}
            className="relative bg-[#C9A227] text-[#1A1A1A] rounded-xl px-3 py-2 flex items-center gap-2 font-bold hover:brightness-95 active:scale-95 transition">
            <ShoppingBasket size={20}/>
            <span className="hidden sm:inline">Mi boleta</span>
            {totalItems>0&&(
              <span className="absolute -top-2 -right-2 bg-[#2B3A2F] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      {/* CATEGORÍAS */}
      <nav className="sticky top-[60px] sm:top-[64px] z-20 bg-[#F2E8D5] border-b border-[#1A1A1A]/10 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 py-3 min-w-max">
          {categories.map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(c.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition ${
                activeCat===c.id?"bg-[#2B3A2F] text-[#F2E8D5] border-[#2B3A2F]":"bg-transparent text-[#2B3A2F] border-[#2B3A2F]/30 hover:border-[#2B3A2F]/70"}`}>
              <span>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>
      </nav>

      {/* BUSCADOR */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar producto... (ej: tomate, coca, pan)"
            className="w-full pl-10 pr-10 py-3 rounded-2xl border-2 border-[#1A1A1A]/15 bg-white text-sm focus:border-[#7A2E1D] focus:outline-none transition shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#7A2E1D]">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* Saludo mascota */}
        <div className="flex items-center gap-4 bg-[#2B3A2F] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 mb-6">
          <img src={MASCOT_SRC} alt="Mascota" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-[#C9A227] flex-shrink-0"/>
          <p className="text-[#F2E8D5] text-sm sm:text-base leading-snug">
            <span className="block text-base sm:text-lg text-[#C9A227]" style={{fontFamily:"'Alfa Slab One',cursive"}}>¡Hola, vecino!</span>
            Elegí lo que necesite y se lo llevamos a su casa, como siempre.
          </p>
        </div>

        {/* Aviso catálogo de respaldo */}
        {usingFallback&&(
          <div className="bg-[#C9A227]/20 border border-[#C9A227] rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between gap-3">
            <p className="text-xs text-[#1A1A1A]/70">Mostrando catálogo de ejemplo. Conectate a internet para ver precios actualizados.</p>
            <button onClick={loadProducts} className="flex items-center gap-1 text-xs font-bold text-[#2B3A2F] whitespace-nowrap">
              <RefreshCw size={13}/> Reintentar
            </button>
          </div>
        )}

        <h2 className="mb-4 text-lg text-[#7A2E1D]" style={{fontFamily:"'Alfa Slab One',cursive"}}>
          {isSearching
            ? `🔍 Resultados para "${search}" (${itemsInCat.length})`
            : `${categories.find(c=>c.id===activeCat)?.icon} ${categories.find(c=>c.id===activeCat)?.label}`
          }
        </h2>

        {/* Spinner */}
        {loading&&(
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#1A1A1A]/50">
            <RefreshCw size={28} className="animate-spin text-[#2B3A2F]"/>
            <p className="text-sm">Cargando catálogo...</p>
          </div>
        )}

        {/* Sin productos en categoría */}
        {!loading&&itemsInCat.length===0&&(
          <div className="text-center py-16 text-[#1A1A1A]/40">
            <p className="text-sm">
              {isSearching
                ? `No encontramos productos para "${search}".`
                : "No hay productos disponibles en esta categoría."
              }
            </p>
          </div>
        )}

        {/* Grid de productos */}
        {!loading&&itemsInCat.length>0&&(
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {itemsInCat.map(p=>{
              const qty=cart[p.id]||0;
              return(
                <div key={p.id} className="bg-white rounded-2xl border-2 border-[#1A1A1A]/8 p-3 sm:p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                  <div>
                    {/* Imagen del producto */}
                    <div className="w-full h-32 rounded-xl mb-2 overflow-hidden bg-[#F2E8D5] flex items-center justify-center">
                      {p.imagen ? (
                        <img src={p.imagen} alt={p.name}
                          className="w-full h-full object-contain p-1"
                          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                        />
                      ) : null}
                      <div style={{display: p.imagen ? 'none' : 'flex'}}
                        className="w-full h-full items-center justify-center text-4xl">
                        {CAT_ICONS[p.cat] || "📦"}
                      </div>
                    </div>
                    <p className="font-bold text-sm sm:text-base leading-snug">{p.name}</p>
                    <p className="text-xs text-[#1A1A1A]/50 mt-0.5">por {p.unit}</p>
                    {/* Badge de stock bajo */}
                    {p.stock !== null && p.stock <= 5 && p.stock > 0 && (
                      <p className="text-xs text-[#7A2E1D] font-bold mt-0.5">⚠️ Últimas {p.stock} unidades</p>
                    )}
                    <p className="text-base sm:text-lg text-[#7A2E1D] mt-2" style={{fontFamily:"'Alfa Slab One',cursive"}}>{CLP(p.price)}</p>
                  </div>
                  <div className="mt-3">
                    {qty===0?(
                      <button onClick={()=>addQty(p.id,1)}
                        className="w-full bg-[#C9A227] text-[#1A1A1A] font-bold rounded-xl py-2 text-sm hover:brightness-95 active:scale-95 transition">
                        Agregar
                      </button>
                    ):(
                      <div className="flex items-center justify-between bg-[#2B3A2F] rounded-xl px-2 py-1.5">
                        <button onClick={()=>addQty(p.id,-1)} className="text-white p-1 rounded-lg hover:bg-white/10"><Minus size={16}/></button>
                        <span className="text-white font-bold text-sm">{qty}</span>
                        <button onClick={()=>addQty(p.id,1)} className="text-white p-1 rounded-lg hover:bg-white/10"><Plus size={16}/></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* BARRA FLOTANTE */}
      {totalItems>0&&!drawerOpen&&(
        <button onClick={()=>setDrawerOpen(true)}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-[#2B3A2F] text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-xl z-30 hover:brightness-110 active:scale-[0.98] transition">
          <span className="font-bold text-sm">{totalItems} producto{totalItems!==1?"s":""}</span>
          <span className="text-lg" style={{fontFamily:"'Alfa Slab One',cursive"}}>{CLP(total)}</span>
        </button>
      )}

      {/* DRAWER BOLETA */}
      {drawerOpen&&(
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setDrawerOpen(false)}/>
          <div className="relative w-full sm:w-[420px] bg-[#FDFBF6] h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="bg-[#7A2E1D] text-[#F2E8D5] px-5 py-4 flex items-center justify-between">
              <h3 style={{fontFamily:"'Alfa Slab One',cursive"}} className="text-lg">Tu boleta</h3>
              <button onClick={()=>setDrawerOpen(false)}><X size={22}/></button>
            </div>
            <div className="flex-1 px-5 py-4">
              {cartList.length===0?(
                <p className="text-center text-[#1A1A1A]/50 mt-12">Todavía no agregaste nada.<br/>Elegí productos del catálogo.</p>
              ):(
                <div className="pb-2">
                  <div className="border-b-2 border-dashed border-[#1A1A1A]/20 pb-3 mb-2">
                    <p className="text-center text-sm text-[#1A1A1A]/60" style={{fontFamily:"'Alfa Slab One',cursive"}}>— ALMACÉN EL SAUCE —</p>
                  </div>
                  {cartList.map(i=>(
                    <div key={i.id} className="flex items-center justify-between py-2 border-b border-dashed border-[#1A1A1A]/15">
                      <div className="flex-1 pr-2">
                        <p className="font-bold text-sm">{i.name}</p>
                        <p className="text-xs text-[#1A1A1A]/50">{i.qty} {i.unit} × {CLP(i.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>addQty(i.id,-1)} className="p-1.5 bg-[#2B3A2F] text-white rounded-lg"><Minus size={14}/></button>
                        <span className="font-bold text-sm w-5 text-center">{i.qty}</span>
                        <button onClick={()=>addQty(i.id,1)} className="p-1.5 bg-[#2B3A2F] text-white rounded-lg"><Plus size={14}/></button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4">
                    <span style={{fontFamily:"'Alfa Slab One',cursive"}} className="text-base">TOTAL</span>
                    <span style={{fontFamily:"'Alfa Slab One',cursive"}} className="text-xl text-[#7A2E1D]">{CLP(total)}</span>
                  </div>
                </div>
              )}
            </div>
            {cartList.length>0&&(
              <div className="px-5 py-4 border-t-2 border-[#1A1A1A]/10">
                <button onClick={()=>setCheckoutOpen(true)}
                  className="w-full bg-[#C9A227] text-[#1A1A1A] font-bold rounded-xl py-3.5 text-base hover:brightness-95 active:scale-[0.98] transition">
                  Continuar pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL CHECKOUT */}
      {checkoutOpen&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={()=>!sent&&setCheckoutOpen(false)}/>
          <div className="relative bg-[#FDFBF6] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {!sent?(
              <>
                <div className="bg-[#2B3A2F] text-white px-5 py-4 rounded-t-2xl flex items-center justify-between">
                  <h3 style={{fontFamily:"'Alfa Slab One',cursive"}} className="text-lg">Datos de entrega</h3>
                  <button onClick={()=>setCheckoutOpen(false)}><X size={20}/></button>
                </div>
                <div className="p-5 space-y-4">
                  <Field label="Nombre" value={form.nombre} onChange={v=>setForm({...form,nombre:v})} placeholder="Tu nombre"/>
                  <Field label="Dirección" value={form.direccion} onChange={v=>setForm({...form,direccion:v})} placeholder="Calle, número, referencia" icon={<MapPin size={16}/>}/>
                  <Field label="Horario preferido" value={form.horario} onChange={v=>setForm({...form,horario:v})} placeholder="Ej: hoy entre 18 y 20h" icon={<Clock size={16}/>}/>
                  <div>
                    <label className="text-sm font-bold block mb-1.5">Forma de pago al recibir</label>
                    <div className="flex gap-2">
                      {[{id:"efectivo",label:"Efectivo"},{id:"pos",label:"Débito / Crédito"}].map(opt=>(
                        <button key={opt.id} onClick={()=>setForm({...form,pago:opt.id})}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition ${form.pago===opt.id?"bg-[#7A2E1D] text-white border-[#7A2E1D]":"bg-transparent text-[#7A2E1D] border-[#7A2E1D]/30"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Notas (opcional)" value={form.notas} onChange={v=>setForm({...form,notas:v})} placeholder="Ej: tomates bien maduros, sin cilantro..." textarea/>
                  <div className="bg-[#F2E8D5] rounded-xl p-3 flex items-center justify-between">
                    <span className="font-bold text-sm">Total a pagar</span>
                    <span style={{fontFamily:"'Alfa Slab One',cursive"}} className="text-lg text-[#7A2E1D]">{CLP(total)}</span>
                  </div>
                  <button onClick={handleConfirm} disabled={!form.nombre||!form.direccion}
                    className="w-full bg-[#25D366] disabled:bg-[#1A1A1A]/20 disabled:cursor-not-allowed text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition">
                    Enviar pedido por WhatsApp
                  </button>
                  {(!form.nombre||!form.direccion)&&(
                    <p className="text-xs text-center text-[#1A1A1A]/50">Completá nombre y dirección para continuar</p>
                  )}
                </div>
              </>
            ):(
              <div className="p-8 text-center space-y-4">
                <img src={MASCOT_SRC} alt="Mascota" className="h-24 w-24 rounded-full object-cover border-4 border-[#C9A227] mx-auto"/>
                <h3 style={{fontFamily:"'Alfa Slab One',cursive"}} className="text-xl text-[#2B3A2F]">¡Pedido enviado!</h3>
                <p className="text-sm text-[#1A1A1A]/70">Se abrió WhatsApp con el detalle de su pedido. Confirme el envío y el almacén le avisa cuando esté en camino.</p>
                <button onClick={resetOrder}
                  className="w-full bg-[#C9A227] text-[#1A1A1A] font-bold rounded-xl py-3 hover:brightness-95 active:scale-[0.98] transition">
                  Hacer otro pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="text-center text-xs text-[#1A1A1A]/40 py-6">
        Almacén El Sauce · Chépica, Colchagua
      </footer>
    </div>
  );
}
