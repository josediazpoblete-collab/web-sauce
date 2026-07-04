import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Home,
  MapPin,
  MessageCircle,
  Minus,
  Package,
  Plus,
  ReceiptText,
  RefreshCw,
  Search,
  Send,
  Share2,
  ShoppingBasket,
  Store,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import productImages from "./productImages.json";

const WHATSAPP_NUMBER = "56966118435";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMcLuDKMIZFnuoU4XMDBN8yN6eH0lG3zpZCMD7SAig3LJ5Uj-NuWmiXXiTk0JkmI-m2HuQaQeaZZja/pub?gid=144694974&single=true&output=csv";

const STORE = {
  name: "Almacén El Sauce",
  location: "Chépica, Colchagua",
  tagline: "Pedido simple para la villa",
  delivery: "Despacho a domicilio",
};

const HERO_PHOTOS = [
  "/fotos/local6.jpg",
  "/fotos/local1.jpg",
  "/fotos/local5.jpg",
  "/fotos/local3.jpg",
  "/fotos/local2.jpg",
  "/fotos/local4.jpg",
];

const CATEGORY_ORDER = [
  "abarrotes",
  "almacen",
  "bebidas",
  "verduleria",
  "pan",
  "fiambres",
  "libreria",
  "helados",
  "ensaladas",
  "aseo",
  "limpieza",
  "carnes",
  "lacteos",
  "snacks",
  "condimentos",
  "mascotas",
  "ferreteria",
];

const CATEGORY_META = {
  abarrotes: { label: "Abarrotes", icon: "🥫", tone: "bg-amber-100 text-amber-900" },
  almacen: { label: "Almacén", icon: "🏪", tone: "bg-emerald-100 text-emerald-900" },
  bebidas: { label: "Bebidas", icon: "🥤", tone: "bg-sky-100 text-sky-900" },
  verduleria: { label: "Verdulería", icon: "🥬", tone: "bg-lime-100 text-lime-900" },
  pan: { label: "Pan", icon: "🍞", tone: "bg-orange-100 text-orange-900" },
  fiambres: { label: "Fiambres", icon: "🧀", tone: "bg-yellow-100 text-yellow-900" },
  libreria: { label: "Librería", icon: "✏️", tone: "bg-violet-100 text-violet-900" },
  helados: { label: "Helados", icon: "🍦", tone: "bg-cyan-100 text-cyan-900" },
  ensaladas: { label: "Ensaladas", icon: "🥗", tone: "bg-green-100 text-green-900" },
  aseo: { label: "Aseo", icon: "🧼", tone: "bg-blue-100 text-blue-900" },
  limpieza: { label: "Limpieza", icon: "🧹", tone: "bg-blue-100 text-blue-900" },
  carnes: { label: "Carnes", icon: "🥩", tone: "bg-rose-100 text-rose-900" },
  lacteos: { label: "Lácteos", icon: "🥛", tone: "bg-indigo-100 text-indigo-900" },
  snacks: { label: "Snacks", icon: "🍿", tone: "bg-red-100 text-red-900" },
  condimentos: { label: "Condimentos", icon: "🧂", tone: "bg-stone-100 text-stone-900" },
  mascotas: { label: "Mascotas", icon: "🐾", tone: "bg-teal-100 text-teal-900" },
  ferreteria: { label: "Ferretería", icon: "🔧", tone: "bg-slate-100 text-slate-900" },
};

const FALLBACK_PRODUCTS = [
  { id: 1, cat: "abarrotes", name: "Aceite Chef 1L", price: 2990, unit: "un" },
  { id: 2, cat: "abarrotes", name: "Arroz Tucapel 1kg", price: 1590, unit: "un" },
  { id: 3, cat: "abarrotes", name: "Azúcar Iansa 1kg", price: 1490, unit: "un" },
  { id: 4, cat: "abarrotes", name: "Fideos Carozzi 400g", price: 990, unit: "un" },
  { id: 5, cat: "libreria", name: "Cuaderno universitario", price: 1990, unit: "un" },
  { id: 6, cat: "libreria", name: "Lápiz mina Bic", price: 350, unit: "un" },
  { id: 7, cat: "libreria", name: "Set lápices de colores", price: 2490, unit: "un" },
  { id: 8, cat: "helados", name: "Helado Bresler 1L", price: 3490, unit: "un" },
  { id: 9, cat: "helados", name: "Paleta de agua", price: 700, unit: "un" },
  { id: 10, cat: "bebidas", name: "Coca-Cola 1.5L", price: 1990, unit: "un" },
  { id: 11, cat: "bebidas", name: "Agua mineral 1.5L", price: 990, unit: "un" },
  { id: 12, cat: "bebidas", name: "Jugo Watts 1L", price: 1290, unit: "un" },
  { id: 13, cat: "verduleria", name: "Tomate", price: 1490, unit: "kg" },
  { id: 14, cat: "verduleria", name: "Palta", price: 2990, unit: "kg" },
  { id: 15, cat: "verduleria", name: "Cebolla", price: 990, unit: "kg" },
  { id: 16, cat: "verduleria", name: "Papa", price: 790, unit: "kg" },
  { id: 17, cat: "pan", name: "Hallulla", price: 1500, unit: "kg" },
  { id: 18, cat: "pan", name: "Marraqueta", price: 1500, unit: "kg" },
];

const PAYMENT_OPTIONS = [
  { id: "efectivo", label: "Efectivo", icon: Banknote },
  { id: "pos", label: "Débito / Crédito", icon: CreditCard },
];

const emptyForm = {
  nombre: "",
  direccion: "",
  horario: "",
  pago: "efectivo",
  notas: "",
};

const CLP = (value) =>
  Number(value || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const keyify = (value = "") => normalizeText(value).replace(/[^a-z0-9]/g, "");

const productImageFor = (name) => productImages[keyify(name)] || "";

const withProductImage = (product) => ({
  ...product,
  image: product.image || productImageFor(product.name),
});

const slugCategory = (value = "") => {
  const normalized = normalizeText(value).replace(/[^a-z0-9]+/g, "");
  const aliases = {
    almacen: "almacen",
    libreria: "libreria",
    verduleria: "verduleria",
    lacteos: "lacteos",
    ferreteria: "ferreteria",
    aseo: "aseo",
  };
  return aliases[normalized] || normalized || "otros";
};

const categoryMeta = (cat) => {
  const slug = slugCategory(cat);
  if (CATEGORY_META[slug]) return CATEGORY_META[slug];
  const label = String(cat || "Otros")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  return { label, icon: "📦", tone: "bg-stone-100 text-stone-900" };
};

const parseMoney = (value) => {
  const cleaned = String(value || "").replace(/[^\d-]/g, "");
  return Number(cleaned) || 0;
};

const firstValue = (...values) => values.find((value) => String(value ?? "").trim() !== "") ?? "";

const parseStock = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return null;

  const parsed = Number(raw.replace(/[^\d,.-]/g, "").replace(",", "."));
  if (!Number.isFinite(parsed)) return null;

  return Math.max(0, Math.floor(parsed));
};

function parseCSVLine(line) {
  const cols = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      cols.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  cols.push(current);
  return cols.map((item) => item.trim().replace(/^"|"$/g, ""));
}

function parseCSV(text) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(keyify);

  return lines
    .slice(1)
    .map((line, index) => {
      const cols = parseCSVLine(line);
      const row = {};
      headers.forEach((header, colIndex) => {
        row[header] = cols[colIndex] || "";
      });

      const availability = normalizeText(firstValue(row.disponible, row.estado, row.activo, row.publicado));
      const inactiveValues = [
        "no",
        "n",
        "false",
        "0",
        "agotado",
        "agotada",
        "sin stock",
        "sinstock",
        "inactivo",
        "oculto",
        "no disponible",
      ];
      const stock = parseStock(firstValue(row.stock, row.cantidad, row.inventario, row.existencias));
      const isAvailable = !inactiveValues.includes(availability) && (stock === null || stock > 0);
      if (!row.nombre || !isAvailable) return null;

      const cat = slugCategory(row.categoria);
      const sheetImage = firstValue(row.imagen, row.foto, row.image, row.imageurl, row.urlimagen, row.linkimagen, row.imgbb);

      return {
        id: Number(row.id) || index + 1,
        cat,
        name: row.nombre,
        price: parseMoney(row.precio),
        unit: row.unidad || "un",
        notes: row.notas || "",
        stock,
        image: sheetImage || productImageFor(row.nombre),
      };
    })
    .filter(Boolean);
}

function encodeOrder(order) {
  const json = JSON.stringify(order);
  const base64 = window.btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeOrder(value) {
  if (!value) return null;
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    return JSON.parse(decodeURIComponent(escape(window.atob(padded))));
  } catch {
    return null;
  }
}

function paymentLabel(paymentId) {
  return PAYMENT_OPTIONS.find((option) => option.id === paymentId)?.label || "Efectivo";
}

function formatPreferredTime(value) {
  const cleanValue = value?.trim();
  if (!cleanValue) return "Lo antes posible";

  const timeMatch = cleanValue.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (timeMatch) return `${timeMatch[1]}:${timeMatch[2]} hrs aprox.`;

  return cleanValue;
}

function orderLink(order) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("pedido", encodeOrder(order));
  return url.toString();
}

function formatOrderMessage(order, link) {
  const lines = [
    `*${STORE.name.toUpperCase()}*`,
    "*Nuevo pedido*",
    "",
    ...order.items.map(
      (item) => `• ${item.qty} ${item.unit} - ${item.name}: ${CLP(item.subtotal)}`
    ),
    "",
    `*Total: ${CLP(order.total)}*`,
    "",
    `Nombre: ${order.customer.nombre}`,
    `Dirección: ${order.customer.direccion}`,
    `Horario aprox: ${formatPreferredTime(order.customer.horario)}`,
    `Pago: ${paymentLabel(order.customer.pago)}`,
  ];

  if (order.customer.notas) lines.push(`Notas: ${order.customer.notas}`);
  if (link) lines.push("", `Detalle del pedido: ${link}`);

  return lines.join("\n");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

async function copyText(value) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the textarea fallback below.
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.left = "-1000px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(textarea);
  }

  return copied;
}

function Field({ label, value, onChange, placeholder, icon: Icon, textarea, autoComplete, type = "text", step }) {
  const handleValueChange = (event) => onChange(event.currentTarget.value);

  return (
    <label className="field">
      <span>{label}</span>
      <div className="field-control">
        {Icon && <Icon size={18} className="field-icon" />}
        {textarea ? (
          <textarea
            rows={3}
            value={value}
            onChange={handleValueChange}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleValueChange}
            onInput={handleValueChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            step={step}
          />
        )}
      </div>
    </label>
  );
}

function QuantityStepper({ qty, onDecrease, onIncrease, compact = false, maxReached = false }) {
  if (qty <= 0) {
    return (
      <button type="button" className="add-button" onClick={onIncrease} disabled={maxReached}>
        <Plus size={16} />
        Agregar
      </button>
    );
  }

  return (
    <div className={compact ? "qty-stepper compact" : "qty-stepper"}>
      <button type="button" onClick={onDecrease} aria-label="Quitar uno">
        <Minus size={16} />
      </button>
      <span>{qty}</span>
      <button type="button" onClick={onIncrease} aria-label="Agregar uno" disabled={maxReached}>
        <Plus size={16} />
      </button>
    </div>
  );
}

function ProductVisual({ product }) {
  const meta = categoryMeta(product.cat);
  const [hasImageError, setHasImageError] = useState(false);

  if (product.image && !hasImageError) {
    return (
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setHasImageError(true)}
      />
    );
  }

  return (
    <div className={`product-symbol ${meta.tone}`}>
      <span>{meta.icon}</span>
    </div>
  );
}

function ProductCard({ product, qty, onAdd, onRemove }) {
  const meta = categoryMeta(product.cat);
  const hasStock = Number.isFinite(product.stock);
  const maxReached = hasStock && qty >= product.stock;

  return (
    <article className="product-card">
      <ProductVisual product={product} />
      <div className="product-copy">
        <span className={`category-pill ${meta.tone}`}>{meta.label}</span>
        <h3>{product.name}</h3>
        <p>por {product.unit}</p>
        {hasStock && <p className="product-stock">{product.stock} disponibles</p>}
        {product.notes && <p className="product-note">{product.notes}</p>}
      </div>
      <div className="product-actions">
        <strong>{CLP(product.price)}</strong>
        <QuantityStepper qty={qty} onDecrease={onRemove} onIncrease={onAdd} maxReached={maxReached} />
      </div>
    </article>
  );
}

function EmptyState({ title, message, onRetry, loading }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{loading ? <RefreshCw className="spin" size={24} /> : <Package size={24} />}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="ghost-button" onClick={onRetry}>
          <RefreshCw size={16} />
          Reintentar
        </button>
      )}
    </div>
  );
}

function OrderSummary({ cartList, total, totalItems, onAdd, onRemove, onCheckout, onClose, drawer = false }) {
  return (
    <aside className={drawer ? "order-panel drawer" : "order-panel"}>
      <div className="order-panel-header">
        <div>
          <span className="eyebrow">Tu pedido</span>
          <h2>Boleta en curso</h2>
        </div>
        {drawer && (
          <button type="button" className="icon-button light" onClick={onClose} aria-label="Cerrar boleta">
            <X size={20} />
          </button>
        )}
      </div>

      {cartList.length === 0 ? (
        <div className="mini-empty">
          <ShoppingBasket size={22} />
          <p>Agrega productos para preparar tu pedido.</p>
        </div>
      ) : (
        <>
          <div className="order-lines">
            {cartList.map((item) => (
              <div key={item.id} className="order-line">
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {item.qty} {item.unit} x {CLP(item.price)}
                  </span>
                </div>
                <QuantityStepper
                  compact
                  qty={item.qty}
                  onDecrease={() => onRemove(item.id)}
                  onIncrease={() => onAdd(item.id)}
                  maxReached={Number.isFinite(item.stock) && item.qty >= item.stock}
                />
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>{totalItems} producto{totalItems !== 1 ? "s" : ""}</span>
            <strong>{CLP(total)}</strong>
          </div>
          <button type="button" className="primary-button" onClick={onCheckout}>
            <ReceiptText size={18} />
            Continuar pedido
          </button>
        </>
      )}
    </aside>
  );
}

function CheckoutModal({
  form,
  setForm,
  total,
  cartList,
  onClose,
  onSend,
  onCopyLink,
  copied,
  sent,
  lastOrder,
  onReset,
}) {
  const ready = form.nombre.trim() && form.direccion.trim() && cartList.length > 0;

  return (
    <div className="modal-shell">
      <button type="button" className="modal-backdrop" onClick={() => !sent && onClose()} aria-label="Cerrar" />
      <section className="checkout-card">
        {!sent ? (
          <>
            <div className="checkout-head">
              <div>
                <span className="eyebrow">Entrega</span>
                <h2>Datos del pedido</h2>
              </div>
              <button type="button" className="icon-button light" onClick={onClose} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <div className="checkout-body">
              <Field
                label="Nombre"
                value={form.nombre}
                onChange={(value) => setForm({ ...form, nombre: value })}
                placeholder="Tu nombre"
                autoComplete="name"
              />
              <Field
                label="Dirección"
                value={form.direccion}
                onChange={(value) => setForm({ ...form, direccion: value })}
                placeholder="Calle, número o referencia"
                icon={MapPin}
                autoComplete="street-address"
              />
              <Field
                label="Horario aproximado"
                value={form.horario}
                onChange={(value) => setForm({ ...form, horario: value })}
                icon={Clock}
                type="time"
                step="900"
                autoComplete="off"
              />

              <div className="payment-group">
                <span>Forma de pago</span>
                <div>
                  {PAYMENT_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        type="button"
                        key={option.id}
                        className={form.pago === option.id ? "payment-option active" : "payment-option"}
                        onClick={() => setForm({ ...form, pago: option.id })}
                      >
                        <Icon size={17} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field
                label="Notas"
                value={form.notas}
                onChange={(value) => setForm({ ...form, notas: value })}
                placeholder="Ej: sin bolsa, pan más tostado..."
                textarea
              />

              <div className="checkout-total">
                <span>Total estimado</span>
                <strong>{CLP(total)}</strong>
              </div>

              <div className="checkout-actions">
                <button type="button" className="primary-button whatsapp" disabled={!ready} onClick={onSend}>
                  <Send size={18} />
                  Enviar por WhatsApp
                </button>
                <button type="button" className="secondary-button" disabled={!ready} onClick={onCopyLink}>
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copied ? "Link copiado" : "Copiar link de pedido"}
                </button>
              </div>

              {!ready && (
                <p className="form-hint">
                  Completa nombre y dirección para habilitar el envío y el link.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon">
              <CheckCircle2 size={34} />
            </div>
            <h2>Pedido preparado</h2>
            <p>Se abrió WhatsApp con la boleta lista para enviar al almacén.</p>
            {lastOrder && (
              <a className="secondary-button full" href={orderLink(lastOrder)} target="_blank" rel="noreferrer">
                <Share2 size={18} />
                Ver detalle compartible
              </a>
            )}
            <button type="button" className="primary-button full" onClick={onReset}>
              Hacer otro pedido
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function OrderDetailPage({ order }) {
  const [copied, setCopied] = useState(false);

  if (!order) {
    return (
      <main className="detail-page">
        <section className="detail-card">
          <AlertCircle size={34} />
          <h1>Pedido no disponible</h1>
          <p>El enlace no contiene una boleta válida.</p>
          <a className="primary-button full" href={window.location.pathname}>
            <ArrowLeft size={18} />
            Volver al catálogo
          </a>
        </section>
      </main>
    );
  }

  const link = window.location.href;
  const message = formatOrderMessage(order, link);

  const copyLink = async () => {
    await copyText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="detail-page">
      <section className="detail-card">
        <div className="detail-top">
          <a className="back-link" href={window.location.pathname}>
            <ArrowLeft size={17} />
            Catálogo
          </a>
          <span className="status-chip">Pedido compartido</span>
        </div>

        <div className="detail-brand">
          <div className="brand-mark">
            <Store size={24} />
          </div>
          <div>
            <h1>{STORE.name}</h1>
            <p>{STORE.location}</p>
          </div>
        </div>

        <div className="receipt-box">
          {order.items.map((item) => (
            <div key={`${item.id}-${item.name}`} className="receipt-line">
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.qty} {item.unit} x {CLP(item.price)}
                </span>
              </div>
              <b>{CLP(item.subtotal)}</b>
            </div>
          ))}
          <div className="receipt-total">
            <span>Total</span>
            <strong>{CLP(order.total)}</strong>
          </div>
        </div>

        <div className="customer-box">
          <h2>Entrega</h2>
          {order.customer?.nombre && (
            <p>
              <UserRound size={16} />
              {order.customer.nombre}
            </p>
          )}
          <p>
            <Home size={16} />
            {order.customer?.direccion}
          </p>
          <p>
            <Clock size={16} />
            {formatPreferredTime(order.customer?.horario)}
          </p>
          <p>
            <ReceiptText size={16} />
            {paymentLabel(order.customer?.pago)}
          </p>
          {order.customer?.notas && <p className="notes">{order.customer.notas}</p>}
        </div>

        <div className="detail-actions">
          <a className="primary-button whatsapp full" href={buildWhatsAppUrl(message)} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            Enviar al almacén
          </a>
          <button type="button" className="secondary-button full" onClick={copyLink}>
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            {copied ? "Link copiado" : "Copiar link"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default function ElSauceStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [activeCat, setActiveCat] = useState("abarrotes");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const drawerOpenRef = useRef(drawerOpen);
  const checkoutOpenRef = useRef(checkoutOpen);

  const sharedOrder = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return decodeOrder(params.get("pedido"));
  }, []);

  drawerOpenRef.current = drawerOpen;
  checkoutOpenRef.current = checkoutOpen;

  useEffect(() => {
    if (sharedOrder) return undefined;

    const currentState = window.history.state || {};
    if (!currentState.elSauceGuard && !currentState.elSauceLayer) {
      window.history.replaceState({ ...currentState, elSauceRoot: true }, "", window.location.href);
      window.history.pushState({ elSauceGuard: true }, "", window.location.href);
    }

    const handlePopState = () => {
      if (checkoutOpenRef.current) {
        setCheckoutOpen(false);
        setSent(false);
        return;
      }

      if (drawerOpenRef.current) {
        setDrawerOpen(false);
        return;
      }

      const wantsToLeave = window.confirm("¿Seguro que quieres salir de la página?");
      if (!wantsToLeave) {
        window.history.pushState({ elSauceGuard: true }, "", window.location.href);
        return;
      }

      window.removeEventListener("popstate", handlePopState);
      window.history.back();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [sharedOrder]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % HERO_PHOTOS.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const pushLayerState = (layer, replace = false) => {
    if (sharedOrder) return;

    const state = { elSauceGuard: true, elSauceLayer: layer };
    if (replace || window.history.state?.elSauceLayer) {
      window.history.replaceState(state, "", window.location.href);
      return;
    }

    window.history.pushState(state, "", window.location.href);
  };

  const closeLayer = (fallback) => {
    if (window.history.state?.elSauceLayer) {
      window.history.back();
      return;
    }

    fallback();
  };

  const loadProducts = async () => {
    setLoading(true);
    setUsingFallback(false);
    setLoadError("");

    try {
      const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("No se pudo leer la planilla");
      const text = await response.text();
      const parsed = parseCSV(text);
      if (!parsed.length) throw new Error("La planilla no tiene productos disponibles");
      setProducts(parsed);
    } catch (error) {
      setProducts(FALLBACK_PRODUCTS.map(withProductImage));
      setUsingFallback(true);
      setLoadError(error.message || "Usando catálogo de respaldo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const productsById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach((product) => counts.set(product.cat, (counts.get(product.cat) || 0) + 1));

    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, count, ...categoryMeta(id) }))
      .sort((a, b) => {
        const indexA = CATEGORY_ORDER.indexOf(a.id);
        const indexB = CATEGORY_ORDER.indexOf(b.id);
        const safeA = indexA === -1 ? 999 : indexA;
        const safeB = indexB === -1 ? 999 : indexB;
        return safeA - safeB || a.label.localeCompare(b.label);
      });
  }, [products]);

  useEffect(() => {
    if (categories.length && !categories.some((category) => category.id === activeCat)) {
      setActiveCat(categories[0].id);
    }
  }, [categories, activeCat]);

  const activeCategory = categories.find((category) => category.id === activeCat);
  const normalizedSearch = normalizeText(search);
  const isSearching = normalizedSearch.length > 0;

  const visibleProducts = useMemo(() => {
    if (isSearching) {
      return products.filter((product) => {
        const haystack = normalizeText(`${product.name} ${product.notes} ${categoryMeta(product.cat).label}`);
        return haystack.includes(normalizedSearch);
      });
    }

    return products.filter((product) => product.cat === activeCat);
  }, [activeCat, isSearching, normalizedSearch, products]);

  const cartList = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = productsById.get(Number(id));
          if (!product || qty <= 0) return null;
          return { ...product, qty, subtotal: product.price * qty };
        })
        .filter(Boolean),
    [cart, productsById]
  );

  const total = cartList.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = cartList.reduce((sum, item) => sum + item.qty, 0);

  const updateQty = (id, delta) => {
    setCart((previous) => {
      const product = productsById.get(Number(id));
      const stockLimit = Number.isFinite(product?.stock) ? product.stock : null;
      const next = { ...previous };
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);
      const limited = stockLimit === null ? updated : Math.min(updated, stockLimit);
      if (limited === 0) delete next[id];
      else next[id] = limited;
      return next;
    });
  };

  const selectCategory = (id) => {
    setActiveCat(id);
    setSearch("");
  };

  const createOrderSnapshot = () => ({
    store: STORE.name,
    createdAt: new Date().toISOString(),
    items: cartList.map((item) => ({
      id: item.id,
      cat: item.cat,
      name: item.name,
      price: item.price,
      unit: item.unit,
      qty: item.qty,
      subtotal: item.subtotal,
    })),
    total,
    customer: {
      nombre: form.nombre.trim(),
      direccion: form.direccion.trim(),
      horario: form.horario.trim(),
      pago: form.pago,
      notas: form.notas.trim(),
    },
  });

  const prepareOrder = () => {
    const order = createOrderSnapshot();
    const link = orderLink(order);
    setLastOrder(order);
    return { order, link };
  };

  const sendOrder = () => {
    const { order, link } = prepareOrder();
    window.open(buildWhatsAppUrl(formatOrderMessage(order, link)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const copyOrderLink = async () => {
    const { link } = prepareOrder();
    await copyText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
    setCheckoutOpen(false);
    pushLayerState("cart");
  };

  const closeDrawer = () => closeLayer(() => setDrawerOpen(false));

  const openCheckout = () => {
    setSent(false);
    setCopied(false);
    setCheckoutOpen(true);
    setDrawerOpen(false);
    pushLayerState("checkout", Boolean(window.history.state?.elSauceLayer));
  };

  const closeCheckout = () =>
    closeLayer(() => {
      setCheckoutOpen(false);
      setSent(false);
    });

  const resetOrder = () => {
    setCart({});
    setForm(emptyForm);
    setSent(false);
    setCopied(false);
    setLastOrder(null);
    setCheckoutOpen(false);
    setDrawerOpen(false);
    if (window.history.state?.elSauceLayer) {
      window.history.replaceState({ elSauceGuard: true }, "", window.location.href);
    }
  };

  if (sharedOrder) return <OrderDetailPage order={sharedOrder} />;

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href={window.location.pathname} aria-label={STORE.name}>
            <span className="brand-mark">
              <Store size={23} />
            </span>
            <span>
              <strong>{STORE.name}</strong>
              <small>{STORE.location}</small>
            </span>
          </a>
          <button type="button" className="cart-button" onClick={openDrawer}>
            <ShoppingBasket size={19} />
            <span>Mi pedido</span>
            {totalItems > 0 && <b>{totalItems}</b>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-photo" style={{ backgroundImage: `url(${HERO_PHOTOS[heroIndex]})` }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div>
              <span className="hero-kicker">
                <Truck size={17} />
                {STORE.delivery}
              </span>
              <h1>Compra para la casa, sin salir de la villa.</h1>
              <p>
                Elige tus productos, confirma la dirección y el pedido llega al WhatsApp del almacén
                con todos los detalles.
              </p>
            </div>
            <div className="hero-card">
              <Store size={22} />
              <span>Atención cercana</span>
              <strong>Pedido por WhatsApp</strong>
            </div>
          </div>
        </section>

        <section className="catalog-shell">
          <div className="catalog-toolbar">
            <div className="search-box">
              <Search size={20} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar tomate, pan, bebida..."
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="Limpiar búsqueda">
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="service-strip">
              <span>
                <MessageCircle size={16} />
                WhatsApp directo
              </span>
              <span>
                <ReceiptText size={16} />
                Link de boleta
              </span>
              <span>
                <Truck size={16} />
                Despacho local
              </span>
            </div>
          </div>

          <div className="category-rail" aria-label="Categorías">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={category.id === activeCat && !isSearching ? "category-tab active" : "category-tab"}
                onClick={() => selectCategory(category.id)}
              >
                <span>{category.icon}</span>
                <strong>{category.label}</strong>
                <small>{category.count}</small>
              </button>
            ))}
          </div>

          <div className="catalog-layout">
            <section className="products-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">{isSearching ? "Resultados" : "Catálogo"}</span>
                  <h2>
                    {isSearching
                      ? `${visibleProducts.length} resultado${visibleProducts.length !== 1 ? "s" : ""} para "${search}"`
                      : activeCategory
                        ? `${activeCategory.icon} ${activeCategory.label}`
                        : "Productos disponibles"}
                  </h2>
                </div>
                {!loading && <p>{products.length} productos activos</p>}
              </div>

              {usingFallback && (
                <div className="notice">
                  <AlertCircle size={18} />
                  <span>{loadError || "Mostrando catálogo de respaldo."}</span>
                  <button type="button" onClick={loadProducts}>
                    Reintentar
                  </button>
                </div>
              )}

              {loading ? (
                <EmptyState
                  loading
                  title="Cargando catálogo"
                  message="Estamos buscando los productos actualizados."
                />
              ) : visibleProducts.length === 0 ? (
                <EmptyState
                  title="No encontramos productos"
                  message={isSearching ? "Prueba con otra palabra o revisa las categorías." : "Esta categoría no tiene productos disponibles."}
                />
              ) : (
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      qty={cart[product.id] || 0}
                      onAdd={() => updateQty(product.id, 1)}
                      onRemove={() => updateQty(product.id, -1)}
                    />
                  ))}
                </div>
              )}
            </section>

            {!drawerOpen && (
              <div className="desktop-order">
                <OrderSummary
                  cartList={cartList}
                  total={total}
                  totalItems={totalItems}
                  onAdd={(id) => updateQty(id, 1)}
                  onRemove={(id) => updateQty(id, -1)}
                  onCheckout={openCheckout}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      {totalItems > 0 && !drawerOpen && !checkoutOpen && (
        <button type="button" className="mobile-cart-bar" onClick={openDrawer}>
          <span>
            <ShoppingBasket size={18} />
            {totalItems} producto{totalItems !== 1 ? "s" : ""}
          </span>
          <strong>{CLP(total)}</strong>
        </button>
      )}

      {drawerOpen && (
        <div className="drawer-shell">
          <button type="button" className="drawer-backdrop" onClick={closeDrawer} aria-label="Cerrar" />
          <OrderSummary
            drawer
            cartList={cartList}
            total={total}
            totalItems={totalItems}
            onAdd={(id) => updateQty(id, 1)}
            onRemove={(id) => updateQty(id, -1)}
            onCheckout={openCheckout}
            onClose={closeDrawer}
          />
        </div>
      )}

      {checkoutOpen && (
        <CheckoutModal
          form={form}
          setForm={setForm}
          total={total}
          cartList={cartList}
          onClose={closeCheckout}
          onSend={sendOrder}
          onCopyLink={copyOrderLink}
          copied={copied}
          sent={sent}
          lastOrder={lastOrder}
          onReset={resetOrder}
        />
      )}

      <footer className="site-footer">
        <span>{STORE.name}</span>
        <span>{STORE.location}</span>
      </footer>
    </div>
  );
}
