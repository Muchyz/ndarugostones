import { useState, useEffect, useRef } from "react";
import "./Admin.css";

const API = "/api/products";
const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || `HTTP ${res.status}`); }
  return res.json();
};

const SECTIONS = ["Stones", "Sand", "Building Materials", "Excavation Services", "Other Services"];
const EMPTY_FORM = { section:"Building Materials", cat:"", title:"", desc:"", badge:"", phone:"+254712345678", wa:"", img:null, cityPrices:{} };

const PlusIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const EditIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const TrashIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const SaveIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const CloseIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const UploadIcon= () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>;
const GripIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><circle cx="8" cy="6" r="1.5"/><circle cx="16" cy="6" r="1.5"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/></svg>;
const ImageIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;

function CityPriceEditor({ cityPrices, onChange }) {
  const [newCity, setNewCity]   = useState("");
  const [newSize, setNewSize]   = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selCity, setSelCity]   = useState("");
  const cities = Object.keys(cityPrices || {});

  const addCity = () => {
    const key = newCity.trim();
    if (!key || cityPrices[key] !== undefined) return;
    onChange({ ...cityPrices, [key]: {} });
    setNewCity(""); setSelCity(key);
  };
  const removeCity = (city) => {
    const u = { ...cityPrices }; delete u[city]; onChange(u);
    if (selCity === city) setSelCity("");
  };
  const addVariant = (city) => {
    const size = newSize.trim(), price = newPrice.trim();
    if (!size || !price) return;
    onChange({ ...cityPrices, [city]: { ...(cityPrices[city]||{}), [size]: price } });
    setNewSize(""); setNewPrice("");
  };
  const removeVariant = (city, size) => {
    const u = { ...cityPrices, [city]: { ...cityPrices[city] } }; delete u[city][size]; onChange(u);
  };
  const updateVariantPrice = (city, size, val) =>
    onChange({ ...cityPrices, [city]: { ...cityPrices[city], [size]: val } });

  return (
    <div className="city-editor">
      <div className="city-editor__new-city">
        <input className="pf__input" placeholder="City e.g. Kiambu" value={newCity} onChange={e=>setNewCity(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCity()} />
        <button className="city-editor__add-btn" onClick={addCity}><PlusIcon/> Add City</button>
      </div>
      {cities.length === 0 && <p className="city-editor__hint">No locations yet. Add a city above.</p>}
      {cities.map(city => {
        const variants = Object.entries(cityPrices[city] || {});
        const isOpen = selCity === city;
        return (
          <div className="city-block" key={city}>
            <div className="city-block__hdr">
              <span className="city-block__name">{city}</span>
              <div className="city-block__hdr-actions">
                <button className="city-block__toggle" onClick={()=>setSelCity(isOpen?"":city)}>{isOpen?"▲ Close":"▼ Add size"}</button>
                <button className="city-editor__remove" onClick={()=>removeCity(city)}><CloseIcon/></button>
              </div>
            </div>
            {variants.length > 0 && (
              <div className="city-block__variants">
                {variants.map(([size, price]) => (
                  <div className="city-block__variant-row" key={size}>
                    <span className="city-block__size">{size}</span>
                    <input className="city-editor__price" value={price} placeholder="KSh —" onChange={e=>updateVariantPrice(city,size,e.target.value)} />
                    <button className="city-editor__remove" onClick={()=>removeVariant(city,size)}><CloseIcon/></button>
                  </div>
                ))}
              </div>
            )}
            {isOpen && (
              <div className="city-block__add-variant">
                <input className="pf__input" placeholder='Size e.g. 6*9' value={newSize} onChange={e=>setNewSize(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addVariant(city)} />
                <input className="pf__input" placeholder="Price e.g. KSh 45" value={newPrice} onChange={e=>setNewPrice(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addVariant(city)} />
                <button className="city-editor__add-btn" onClick={()=>addVariant(city)}><PlusIcon/> Add</button>
              </div>
            )}
            {variants.length===0&&!isOpen&&<p className="city-editor__hint" style={{margin:"6px 0 2px"}}>No sizes yet — click "Add size"</p>}
          </div>
        );
      })}
    </div>
  );
}

function ProductForm({ initial, onSave, onCancel, isNew }) {
  const [form, setForm]         = useState(() => initial ? { ...initial, img:null } : { ...EMPTY_FORM, cityPrices:{} });
  const [preview, setPreview]   = useState(initial?.img || null);
  const [saving, setSaving]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [dragOver, setDragOver] = useState(false);
  const [compressing, setComp]  = useState(false);
  const fileRef = useRef();

  const set = (key, val) => { setForm(f=>({...f,[key]:val})); if(errors[key]) setErrors(e=>({...e,[key]:null})); };

  const processFile = (file) => {
    if (!file||!file.type.startsWith("image/")) return;
    setComp(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const MAX=1200; let {width,height}=img;
        if(width>MAX||height>MAX){const r=Math.min(MAX/width,MAX/height);width=Math.round(width*r);height=Math.round(height*r);}
        const canvas=document.createElement("canvas"); canvas.width=width; canvas.height=height;
        canvas.getContext("2d").drawImage(img,0,0,width,height);
        const b64=canvas.toDataURL("image/jpeg",0.82);
        set("img",b64); setPreview(b64); setComp(false);
      };
      img.src=ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e={};
    if(!form.cat.trim())   e.cat  ="Category required";
    if(!form.title.trim()) e.title="Title required";
    if(!form.desc.trim())  e.desc ="Description required";
    if(!preview)           e.img  ="Please upload a product photo";
    return e;
  };

  const handleSubmit = async () => {
    const e=validate(); if(Object.keys(e).length){setErrors(e);return;}
    setSaving(true);
    try { await onSave(form); } catch(err) { setErrors({submit:err.message}); } finally { setSaving(false); }
  };

  return (
    <div className="pf">
      <div className="pf__head"><span className="pf__label">{isNew?"Add New Product":"Edit Product"}</span><button className="pf__close" onClick={onCancel}><CloseIcon/></button></div>
      <div className="pf__body">

        {/* Section selector — full width at top */}
        <div className="pf__field pf__field--full">
          <label className="pf__lbl">Section <span className="pf__req">*</span></label>
          <div className="pf__section-tabs">
            {SECTIONS.map(s=>(
              <button key={s} className={`pf__section-tab${form.section===s?" pf__section-tab--active":""}`} onClick={()=>set("section",s)}>{s}</button>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="pf__field pf__field--full">
          <label className="pf__lbl">Product Photo <span className="pf__req">*</span></label>
          {!preview ? (
            <div className={`pf__upload-zone${dragOver?" pf__upload-zone--over":""}`} onClick={()=>fileRef.current?.click()} onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);processFile(e.dataTransfer.files?.[0])}}>
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>processFile(e.target.files?.[0])} />
              {compressing?<><div className="pf__compress-spinner"/><span className="pf__upload-title">Processing…</span></>:<><UploadIcon/><span className="pf__upload-title">Click or drag & drop your photo</span><span className="pf__upload-hint">JPG · PNG · WEBP — auto-compressed</span></>}
            </div>
          ) : (
            <div className="pf__img-preview">
              <img src={preview} alt="preview"/>
              <div className="pf__img-actions">
                <button className="pf__img-btn" onClick={()=>fileRef.current?.click()}><UploadIcon/> Change</button>
                <button className="pf__img-btn pf__img-btn--danger" onClick={()=>{setPreview(null);set("img",null)}}><CloseIcon/> Remove</button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>processFile(e.target.files?.[0])} />
            </div>
          )}
          {errors.img&&<span className="pf__err">{errors.img}</span>}
        </div>

        <div className="pf__field">
          <label className="pf__lbl">Category <span className="pf__req">*</span></label>
          <input className={`pf__input${errors.cat?" pf__input--err":""}`} placeholder="e.g. Ndarugo Stones" value={form.cat} onChange={e=>set("cat",e.target.value)} />
          {errors.cat&&<span className="pf__err">{errors.cat}</span>}
        </div>
        <div className="pf__field">
          <label className="pf__lbl">Badge <span className="pf__opt">(optional)</span></label>
          <input className="pf__input" placeholder="e.g. Popular" value={form.badge||""} onChange={e=>set("badge",e.target.value)} />
        </div>

        <div className="pf__field pf__field--full">
          <label className="pf__lbl">Title <span className="pf__req">*</span></label>
          <input className={`pf__input${errors.title?" pf__input--err":""}`} placeholder="e.g. Ndarugo Stones 6*9" value={form.title} onChange={e=>set("title",e.target.value)} />
          {errors.title&&<span className="pf__err">{errors.title}</span>}
        </div>

        <div className="pf__field pf__field--full">
          <label className="pf__lbl">Description <span className="pf__req">*</span></label>
          <textarea className={`pf__textarea${errors.desc?" pf__input--err":""}`} rows={3} placeholder="Short description..." value={form.desc} onChange={e=>set("desc",e.target.value)} />
          {errors.desc&&<span className="pf__err">{errors.desc}</span>}
        </div>

        <div className="pf__field pf__field--full">
          <label className="pf__lbl">Locations, Sizes & Prices</label>
          <p className="pf__field-hint">Add a city → then add sizes with prices</p>
          <CityPriceEditor cityPrices={form.cityPrices} onChange={val=>set("cityPrices",val)} />
        </div>

        <div className="pf__field">
          <label className="pf__lbl">Phone Number</label>
          <input className="pf__input" placeholder="+254712345678" value={form.phone||""} onChange={e=>set("phone",e.target.value)} />
        </div>
        <div className="pf__field">
          <label className="pf__lbl">WhatsApp Message</label>
          <input className="pf__input" placeholder="Hi, I'm interested in..." value={form.wa||""} onChange={e=>set("wa",e.target.value)} />
        </div>

        {errors.submit&&<p className="pf__err pf__field--full">{errors.submit}</p>}
        <div className="pf__foot">
          <button className="pf__btn pf__btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="pf__btn pf__btn--save" onClick={handleSubmit} disabled={saving}><SaveIcon/> {saving?"Saving…":isNew?"Add Product":"Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, index, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const cityEntries = Object.entries(product.cityPrices||{});
  return (
    <div className="pr">
      <div className="pr__drag"><GripIcon/></div>
      <div className="pr__img-wrap">
        {product.img?<img src={product.img} alt={product.title} className="pr__img"/>:<div className="pr__img-ph"><ImageIcon/></div>}
        {product.badge&&<span className="pr__badge">{product.badge}</span>}
      </div>
      <div className="pr__info">
        <span className="pr__section-tag">{product.section}</span>
        <span className="pr__cat">{product.cat}</span>
        <span className="pr__title">{product.title}</span>
        <div className="pr__prices">
          {cityEntries.length>0?cityEntries.map(([city,sizes])=>(
            <span className="pr__price-chip" key={city}>
              <span className="pr__price-city">{city}</span>
              <span className="pr__price-val">{typeof sizes==="object"?Object.entries(sizes).map(([s,p])=>`${s}:${p}`).join(" · "):sizes}</span>
            </span>
          )):<span style={{fontSize:10,color:"rgba(255,255,255,0.2)"}}>No locations</span>}
        </div>
      </div>
      <div className="pr__order-btns">
        <button className="pr__order-btn" onClick={onMoveUp} disabled={isFirst}>↑</button>
        <span className="pr__order-num">{index+1}</span>
        <button className="pr__order-btn" onClick={onMoveDown} disabled={isLast}>↓</button>
      </div>
      <div className="pr__actions">
        <button className="pr__btn pr__btn--edit" onClick={onEdit}><EditIcon/> Edit</button>
        {confirmDelete?(
          <div className="pr__confirm"><span>Delete?</span><button className="pr__confirm-yes" onClick={onDelete}>Yes</button><button className="pr__confirm-no" onClick={()=>setConfirmDelete(false)}>No</button></div>
        ):(
          <button className="pr__btn pr__btn--del" onClick={()=>setConfirmDelete(true)}><TrashIcon/> Delete</button>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [panel,    setPanel]    = useState(null);
  const [toast,    setToast]    = useState(null);
  const [filter,   setFilter]   = useState("All");

  const showToast = (msg,type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3200); };

  const fetchProducts = async () => {
    try { setLoading(true); setError(null); setProducts(await apiFetch(API)); }
    catch(e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ fetchProducts(); },[]);

  const handleAdd = async (form) => {
    const maxOrder = products.reduce((m,p)=>Math.max(m,p.sort_order||0),-1);
    const created = await apiFetch(API,{method:"POST",body:JSON.stringify({...form,sort_order:maxOrder+1})});
    setProducts(prev=>[...prev,created]); setPanel(null); showToast("Product added!");
  };

  const handleEdit = async (form) => {
    const product = products[panel.index];
    const updated = await apiFetch(`${API}/${product.id}`,{method:"PUT",body:JSON.stringify({...form,sort_order:product.sort_order})});
    setProducts(prev=>prev.map((p,i)=>i===panel.index?updated:p)); setPanel(null); showToast("Changes saved!");
  };

  const handleDelete = async (i) => {
    await apiFetch(`${API}/${products[i].id}`,{method:"DELETE"});
    setProducts(prev=>prev.filter((_,idx)=>idx!==i)); showToast("Product deleted");
  };

  const handleMove = async (i,dir) => {
    const j=i+dir; if(j<0||j>=products.length) return;
    const next=[...products]; [next[i],next[j]]=[next[j],next[i]];
    const reordered=next.map((p,idx)=>({...p,sort_order:idx}));
    setProducts(reordered);
    try { await apiFetch(`${API}/reorder`,{method:"PUT",body:JSON.stringify(reordered.map(p=>({id:p.id,sort_order:p.sort_order})))}); }
    catch { showToast("Reorder failed","err"); fetchProducts(); }
  };

  const filtered = filter==="All" ? products : products.filter(p=>p.section===filter);

  return (
    <div className="admin">
      <header className="admin__hdr">
        <div className="admin__hdr-left">
          <div className="admin__logo"><span className="admin__logo-bar"/><span className="admin__logo-text">Admin</span></div>
          <div className="admin__breadcrumb"><a href="/" className="admin__bc-link">Site</a><span className="admin__bc-sep">/</span><span>Products</span></div>
        </div>
        <div className="admin__hdr-right">
          <a href="/" className="admin__preview-btn" target="_blank" rel="noreferrer">Preview Site ↗</a>
        </div>
      </header>

      <main className="admin__main">
        <div className="admin__title-bar">
          <div>
            <h1 className="admin__title">Product Catalogue</h1>
            <p className="admin__subtitle">{loading?"Loading…":`${products.length} product${products.length!==1?"s":""}`}</p>
          </div>
          <button className="admin__add-btn" onClick={()=>setPanel({mode:"add"})}><PlusIcon/> Add Product</button>
        </div>

        {/* Section filter tabs */}
        <div className="admin__filter-tabs">
          {["All",...SECTIONS].map(s=>(
            <button key={s} className={`admin__filter-tab${filter===s?" admin__filter-tab--active":""}`} onClick={()=>setFilter(s)}>
              {s}
              <span className="admin__filter-count">
                {s==="All"?products.length:products.filter(p=>p.section===s).length}
              </span>
            </button>
          ))}
        </div>

        {error&&<div className="admin__error"><strong>Could not connect.</strong> {error} <button onClick={fetchProducts}>Retry</button></div>}

        {loading?<div className="admin__loading"><div className="admin__spinner"/><span>Loading…</span></div>
        :filtered.length===0&&!error?<div className="admin__empty"><span className="admin__empty-icon">📦</span><p>No products in this section yet.</p></div>
        :<div className="admin__list">{filtered.map((p,i)=>{
          const realIndex = products.indexOf(p);
          return <ProductRow key={p.id} product={p} index={realIndex} isFirst={realIndex===0} isLast={realIndex===products.length-1} onEdit={()=>setPanel({mode:"edit",index:realIndex})} onDelete={()=>handleDelete(realIndex)} onMoveUp={()=>handleMove(realIndex,-1)} onMoveDown={()=>handleMove(realIndex,1)}/>;
        })}</div>}
      </main>

      {panel&&(
        <div className="admin__overlay" onClick={e=>e.target===e.currentTarget&&setPanel(null)}>
          <div className="admin__panel">
            <ProductForm isNew={panel.mode==="add"} initial={panel.mode==="edit"?products[panel.index]:null} onSave={panel.mode==="add"?handleAdd:handleEdit} onCancel={()=>setPanel(null)}/>
          </div>
        </div>
      )}
      {toast&&<div className={`admin__toast admin__toast--${toast.type}`}>{toast.type==="ok"?"✓":"✕"} {toast.msg}</div>}
    </div>
  );
}
