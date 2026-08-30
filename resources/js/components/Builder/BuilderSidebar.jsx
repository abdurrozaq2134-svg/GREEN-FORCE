import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import '../../../css/builder.css';
import GradientPicker from './shared/GradientPicker';

// ===================== DATA KOMPONEN =====================
const BASIC_COMPONENTS = [
  { type: 'text', label: 'Teks', icon: <IconText /> },
  { type: 'image', label: 'Gambar', icon: <IconImage /> },
  { type: 'button', label: 'Tombol', icon: <IconButton /> },
  { type: 'shape', label: 'Bentuk', icon: <IconShape /> },
  { type: 'video', label: 'Video', icon: <IconVideo /> },
];

const EVENT_COMPONENTS = [];

const ALL_COMPONENTS = [...BASIC_COMPONENTS, ...EVENT_COMPONENTS];

function defaultPropsFor(type) {
  const defaults = {
    text: { content: 'Teks baru', fontSize: 24, color: '#1a1a1a', fontWeight: '600' },
    image: { src: 'https://placehold.co/400x300?text=Gambar', alt: 'Gambar' },
    button: { label: 'Klik di sini', bgColor: '#4f46e5', textColor: '#ffffff', radius: 8 },
    shape: { bgColor: '#e5e7eb', radius: 8 },
    video: { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', alt: 'Video' },
    countdown: { label: 'Menuju Hari-H', targetDate: '', color: '#1a1a1a' },
    rsvp: { title: 'Konfirmasi Kehadiran', subtitle: 'Isi form di bawah ini', showGuestCount: true, buttonLabel: 'Kirim RSVP', buttonColor: '#4f46e5' },
    schedule: { title: 'Rangkaian Acara', items: [{ time: '19:00', desc: 'Pembukaan' }, { time: '19:30', desc: 'Acara Inti' }] },
    ticket: { title: 'Pilih Tiket', tiers: [{ name: 'Reguler', price: 'Rp 150.000', quota: 100 }] },
    map: { address: 'Jl. Contoh No. 123, Kota' },
    poll: { question: 'Pilih opsi', options: ['Opsi A', 'Opsi B', 'Opsi C'], showResults: true },
    guestbook: { title: 'Ucapan', placeholder: 'Tulis pesan Anda...' },
    feedback: { title: 'Rating & Komentar', ratingOptions: ['1', '2', '3', '4', '5'] },
    sponsor: { name: 'Nama Sponsor', url: '#' },
    // LOGIC BUTTON DEFAULTS
    submit: { label: 'Submit', action: 'save', color: '#10b981' },
    oke: { label: 'Oke', action: 'close', color: '#3b82f6' },
    cancel: { label: 'Batal', action: 'cancel', color: '#ef4444' },
    // NEW SHAPES - Basic (filled)
    rectangle: { bgColor: '#e5e7eb', radius: 4 },
    'rounded-rectangle': { bgColor: '#e5e7eb', radius: 16 },
    circle: { bgColor: '#e5e7eb', radius: 9999 },
    triangle: { bgColor: '#e5e7eb' },
    diamond: { bgColor: '#e5e7eb' },
    pentagon: { bgColor: '#e5e7eb' },
    hexagon: { bgColor: '#e5e7eb' },
    polygon: { bgColor: '#e5e7eb', sides: 6 },
    star: { bgColor: '#f59e0b', points: 5 },
    heart: { bgColor: '#ef4444' },
    'speech-bubble': { bgColor: '#3b82f6' },
    blob: { bgColor: '#8b5cf6' },
    // Functional
    divider: { strokeColor: '#d1d5db', strokeWidth: 1, strokeDasharray: 'none', fullWidth: true },
    badge: { bgColor: '#4f46e5', textColor: '#ffffff', label: 'Badge', radius: 9999, paddingX: 12, paddingY: 4 },
  };
  return JSON.parse(JSON.stringify(defaults[type] || {}));
}

function defaultSizeFor(type) {
  const sizes = {
    text: { width: 300, height: 40 },
    image: { width: 300, height: 200 },
    button: { width: 160, height: 44 },
    shape: { width: 150, height: 150 },
    video: { width: 400, height: 225 },
    countdown: { width: 360, height: 110 },
    rsvp: { width: 320, height: 260 },
    schedule: { width: 340, height: 200 },
    ticket: { width: 320, height: 180 },
    map: { width: 300, height: 60 },
    poll: { width: 320, height: 140 },
    guestbook: { width: 300, height: 200 },
    feedback: { width: 300, height: 200 },
    sponsor: { width: 200, height: 80 },
    // LOGIC BUTTON SIZES
    submit: { width: 140, height: 40 },
    oke: { width: 100, height: 40 },
    cancel: { width: 100, height: 40 },
    // NEW SHAPES
    rectangle: { width: 160, height: 100 },
    'rounded-rectangle': { width: 160, height: 100 },
    circle: { width: 120, height: 120 },
    triangle: { width: 120, height: 120 },
    diamond: { width: 120, height: 120 },
    pentagon: { width: 120, height: 120 },
    hexagon: { width: 120, height: 120 },
    polygon: { width: 120, height: 120 },
    star: { width: 120, height: 120 },
    heart: { width: 120, height: 120 },
    'speech-bubble': { width: 160, height: 100 },
    blob: { width: 140, height: 140 },
    divider: { width: 1200, height: 2 },
    badge: { width: 100, height: 36 },
  };
  return sizes[type] || { width: 200, height: 100 };
}

function getComponentMeta(type) {
  return ALL_COMPONENTS.find((c) => c.type === type);
}

// ===================== MODEL DATA DUAL-INTERFACE =====================
// Define the dual-interface model for each element type
const ELEMENT_MODELS = {
  // BASIC ELEMENTS
  text: {
    participant: { element: <div>{props.content}</div> },
    committee: {
      table: 'submissions',
      fields: ['id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { name: 'John Doe', email: 'john@example.com', content: 'Teks input' }
    }
  },
  image: {
    participant: <img src={props.src} alt={props.alt} />,
    committee: {
      table: 'media',
      fields: ['id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at', 'approved'],
      example: { url: 'https://example.com/image.jpg', approved: false }
    }
  },
  button: {
    participant: <button>{props.label}</button>,
    committee: {
      table: 'submissions',
      fields: ['id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { action: 'clicked', count: 0 }
    }
  },
  shape: {
    participant: <div style={props.bgColor} />,
    committee: {
      table: 'submissions',
      fields: ['id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { interaction: 'viewed', count: 0 }
    }
  },

  // EVENT COMPONENTS
  countdown: {
    participant: {/* countdown display */},
    committee: {
      table: 'submissions',
      fields: ['id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { targetDate: '2024-12-31', clicks: 0 }
    }
  },
  rsvp: {
    participant: {/* form fields */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'status', 'created_at'],
      example: { name: 'John Doe', email: 'john@example.com', status: 'pending', event_id: 'ev_123' }
    }
  },
  schedule: {
    participant: {/* schedule display */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { session: 'Pembukaan', attendees: 50 }
    }
  },
  ticket: {
    participant: {/* ticket selection */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'status', 'created_at'],
      example: { tier: 'Reguler', price: '150000', status: 'paid' }
    }
  },
  map: {
    participant: {/* map display */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { clicks: 15, address: 'Jl. Contoh No. 123' }
    }
  },

  // LOGIC BUTTONS - DUAL INTERFACE
  poll: {
    participant: {/* polling interface */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at'],
      example: { option: 'Opsi A', votes: 25, total: 100 }
    }
  },
  guestbook: {
    participant: {/* guestbook form */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'created_at', 'moderated'],
      example: { name: 'Budi', message: 'Selamat jalan!', moderated: false }
    }
  },
  feedback: {
    participant: {/* feedback form */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'rating', 'created_at'],
      example: { rating: 5, comment: 'Bagus!', user: 'jane@example.com' }
    }
  },
  sponsor: {
    participant: {/* sponsor link */},
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'clicks', 'created_at'],
      example: { sponsor: 'Acme Corp', clicks: 45 }
    }
  },

  // LOGIC BUTTONS
  submit: {
    participant: <button className="btn-primary">{props.label}</button>,
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'status', 'created_at'],
      example: { action: 'submit', form_type: 'rsvp', data_saved: true }
    }
  },
  oke: {
    participant: <button className="btn-primary">{props.label}</button>,
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'action', 'created_at'],
      example: { action: 'ok', target: 'modal_close' }
    }
  },
  cancel: {
    participant: <button className="btn-secondary">{props.label}</button>,
    committee: {
      table: 'submissions',
      fields: ['id', 'event_page_id', 'element_id', 'type', 'payload', 'user_identifier', 'action', 'created_at'],
      example: { action: 'cancel', target: 'modal_close' }
    }
  },
};

// ===================== KOMPONEN UTAMA =====================
export default function EventBuilder({ pageId, initialTitle, initialElements, saveUrl }) {
  const [pageTitle, setPageTitle] = useState(initialTitle || 'Event Baru');
  const [elements, setElements] = useState(initialElements?.length ? initialElements : []);
  const [selectedId, setSelectedId] = useState(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeBreakpoint, setActiveBreakpoint] = useState('desktop');
  const [canvasWidth, setCanvasWidth] = useState(
    BREAKPOINTS.find((b) => b.name === activeBreakpoint)?.width || 1200
  );
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error
  const [now, setNow] = useState(new Date());
  const canvasRef = useRef(null);

  // Make canvas width responsive to container resize
  useEffect(() => {
    const updateCanvasWidth = () => {
      const container = document.querySelector('.canvas-viewport');
      if (container) {
        const computedStyle = window.getComputedStyle(container);
        const width = parseFloat(computedStyle.width);
        if (!isNaN(width) && width > 0) {
          setCanvasWidth(width);
        }
      }
    };
    // Run on mount and on resize
    updateCanvasWidth();
    window.addEventListener('resize', updateCanvasWidth);
    return () => window.removeEventListener('resize', updateCanvasWidth);
  }, []);

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  // Tick tiap detik untuk countdown real-time
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, [now]);

  const updateElement = useCallback((id, patch) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...patch } : el)));
  }, []);

  const updateElementProps = useCallback((id, propsPatch) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, props: { ...el.props, ...propsPatch } } : el))
    );
  }, []);

  const deleteElement = useCallback((id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId(null);
  }, []);

  const toggleVisibility = useCallback((id) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, visible: el.visible === false ? true : false } : el))
    );
  }, []);

  // Satu-satunya pintu masuk untuk memilih elemen.
  // Kalau elemen yang sama diklik lagi (misal panel sempat ditutup), panel dibuka ulang.
  // Kalau elemen baru dipilih, selalu buka panel.
  const selectElement = useCallback(
    (id) => {
      setSelectedId((prevId) => {
        setPanelOpen(true);
        return id;
      });
    },
    []
  );

  // Dipanggil saat komponen di sidebar diklik -> langsung muncul di tengah kanvas
  const addElementToCanvas = (type) => {
    const size = defaultSizeFor(type);
    const countSameType = elements.filter((el) => el.type === type).length;

    const newEl = {
      id: 'el_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      type,
      name: getComponentMeta(type)?.label + ' ' + (countSameType + 1),
      // Posisi tengah kanvas, sedikit digeser tiap nambah elemen baru biar gak numpuk persis
      x: Math.max(0, canvasWidth / 2 - size.width / 2 + countSameType * 16),
      y: Math.max(0, 100 + countSameType * 16),
      width: size.width,
      height: size.height,
      visible: true,
      props: defaultPropsFor(type),
    };

    setElements((prev) => [...prev, newEl]);
    selectElement(newEl.id);
  };

  const saveLayout = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch(saveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ id: pageId, title: pageTitle, elements }),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus((s) => (s === 'saved' ? 'idle' : s)), 2000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const saveStatusText = { idle: '', saving: 'Menyimpan...', saved: 'Tersimpan', error: 'Gagal menyimpan' }[saveStatus];

  return (
    <div className="builder">
      {/* ===================== TOOLBAR ===================== */}
      <header className="toolbar">
        <div className="toolbar-left">
          <button className="icon-btn" title="Kembali" onClick={() => window.history.back()}>
            <IconBack />
          </button>
          <input
            className="page-title-input"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Nama Event"
          />
        </div>

        <div className="toolbar-center">
          {BREAKPOINTS.map((bp) => (
            <button
              key={bp.name}
              className={'bp-btn' + (activeBreakpoint === bp.name ? ' active' : '')}
              title={bp.label}
              onClick={() => setActiveBreakpoint(bp.name)}
            >
              {bp.label}
            </button>
          ))}
        </div>

        <div className="toolbar-right">
          <span className={'save-status ' + saveStatus}>{saveStatusText}</span>
          
          <button className="btn-primary" onClick={saveLayout} disabled={saveStatus === 'saving'}>
            Simpan
          </button>
        </div>
      </header>

      <div className="builder-body">
        {/* ===================== SIDEBAR ===================== */}
        {!previewMode && (
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3>Elemen Dasar</h3>
              <div className="component-grid">
                {BASIC_COMPONENTS.map((comp) => (
                  <div
                    key={comp.type}
                    className="component-card"
                    onClick={() => addElementToCanvas(comp.type)}
                  >
                    <span className="component-icon">{comp.icon}</span>
                    <span className="component-label">{comp.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>
                Logika Event <span className="badge">Khusus</span>
              </h3>
              <div className="component-grid">
                {EVENT_COMPONENTS.map((comp) => (
                  <div
                    key={comp.type}
                    className="component-card event-card"
                    onClick={() => addElementToCanvas(comp.type)}
                  >
                    <span className="component-icon">{comp.icon}</span>
                    <span className="component-label">{comp.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Logika (Button)</h3>
              <div className="component-grid logic-grid">
                {EVENT_COMPONENTS
                  .filter((comp) => comp.isLogic)
                  .map((comp) => (
                    <div
                      key={comp.type}
                      className="component-card logic-card"
                      onClick={() => addElementToCanvas(comp.type)}
                    >
                      <span className="component-icon">{comp.icon}</span>
                      <span className="component-label">{comp.label}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Lapisan</h3>
              <div className="layers-list">
                {elements.map((el) => (
                  <div
                    key={el.id}
                    className={'layer-item' + (selectedId === el.id ? ' active' : '')}
                    onClick={() => selectElement(el.id)}
                  >
                    <span>{getComponentMeta(el.type)?.icon}</span>
                    <span className="layer-name">{el.name}</span>
                    <button
                      className="layer-visibility"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLayerVisibility?.(el.id);
                      }}
                    >
                      {el.visible !== false ? <IconEye /> : <IconEyeOff />}
                    </button>
                  </div>
                ))}
                {elements.length === 0 && <p className="layers-empty">Belum ada elemen. Klik komponen di atas untuk menambah.</p>}
              </div>
            </div>
          </aside>
        )}

        {/* ===================== CANVAS ===================== */}
        <main className="canvas-viewport" onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}>
          <div
            className="canvas-page"
            style={{ width: canvasWidth, minHeight: 800 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
            ref={canvasRef}
          >
            {elements.map((el) =>
              el.visible === false ? null : (
                <Rnd
                  key={el.id}
                  size={{ width: el.width, height: el.height }}
                  position={{ x: el.x, y: el.y }}
                  onDragStop={(e, d) => {
                    // Hanya update kalau ada pergerakan nyata; klik tanpa drag jangan ubah posisi
                    if (d.x === el.x && d.y === el.y) return;
                    updateElement(el.id, { x: d.x, y: d.y });
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateElement(el.id, {
                      width: parseInt(ref.style.width, 10),
                      height: parseInt(ref.style.height, 10),
                      x: position.x,
                      y: position.y,
                    });
                  }}
                  bounds="parent"
                  disableDragging={previewMode}
                  enableUserSelectHack={false}
                  onDragStart={() => selectElement(el.id)}
                  onResizeStart={() => selectElement(el.id)}
                  className={'canvas-element' + (selectedId === el.id ? ' selected' : '')}
                  resizeHandleClasses={{
                    topLeft: 'resize-handle handle-nw',
                    topRight: 'resize-handle handle-ne',
                    bottomLeft: 'resize-handle handle-sw',
                    bottomRight: 'resize-handle handle-se',
                  }}
                  enableResizing={
                    !previewMode && {
                      top: false, right: false, bottom: false, left: false,
                      topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
                    }
                  }
                >
                  <ElementRenderer el={el} now={now} />
                </Rnd>
              )
            )}

            {elements.length === 0 && (
              <p className="canvas-empty-hint">Klik elemen dari sidebar kiri untuk mulai mendesain</p>
            )}
          </div>
        </main>

        {/* ===================== PROPERTIES PANEL ===================== */}
        {!previewMode && selectedElement && panelOpen && (
          <aside className="properties-panel">
            <PropertiesPanel
              element={selectedElement}
              onUpdate={(patch) => updateElement(selectedElement.id, patch)}
              onUpdateProps={(patch) => updateElementProps(selectedElement.id, patch)}
              onDelete={() => deleteElement(selectedElement.id)}
              onClosePanel={() => setPanelOpen(false)}
              elementModels={ELEMENT_MODELS}
            />
          </aside>
        )}

        {/* Tombol mengambang untuk buka lagi panel saat elemen masih dipilih tapi panel ditutup */}
        {!previewMode && selectedElement && !panelOpen && (
          <button className="reopen-panel-btn" onClick={() => setPanelOpen(true)} title="Buka panel properti">
            <IconSettings />
          </button>
        )}
      </div>
    </div>
  );
}

// ===================== RENDER ELEMEN DI KANVAS =====================
export function ElementRenderer({ el, now }) {
    switch (el.type) {
    case 'text':
      return (
        <div
          className="el-text"
          style={{ fontSize: el.props.fontSize, color: el.props.color, fontWeight: el.props.fontWeight }}
        >
          {el.props.content}
        </div>
      );

    case 'image':
      return <img src={el.props.src} alt={el.props.alt} className="el-image" />

    case 'button':
      return (
        <button
          className="el-button"
          style={{ background: el.props.bgColor, color: el.props.textColor, borderRadius: el.props.radius }}
        >
          {el.props.label}
        </button>
      );

    case 'shape':
      return <div className="el-shape" style={{ background: el.props.bgColor, borderRadius: el.props.radius }} />

    case 'video':
      return (
        <div className="el-video">
          <iframe
            width={el.props.width}
            height={el.props.height}
            src={el.props.src}
            title={el.props.alt}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );

    case 'countdown': {
      const units = getCountdownUnits(el.props.targetDate, now);
      return (
        <div className="el-countdown" style={{ color: el.props.color }}>
          <div className="countdown-label">{el.props.label}</div>
          <div className="countdown-grid">
            {units.map((u) => (
              <div key={u.label} className="countdown-unit">
                <span className="countdown-value">{u.value}</span>
                <span className="countdown-unit-label">{u.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'rsvp':
      return (
        <div className="el-rsvp">
          <h4>{el.props.title}</h4>
          <p className="el-rsvp-sub">{el.props.subtitle}</p>
          <div className="el-rsvp-field">Nama Lengkap</div>
          <div className="el-rsvp-field">Email</div>
          {el.props.showGuestCount && <div className="el-rsvp-field">Jumlah Tamu</div>}
          <div className="el-rsvp-submit" style={{ background: el.props.buttonColor }}>
            {el.props.buttonLabel}
          </div>
        </div>
      );

    case 'schedule':
      return (
        <div className="el-schedule">
          <h4>{el.props.title}</h4>
          {el.props.items.map((item, idx) => (
            <div key={idx} className="schedule-row">
              <span className="schedule-time">{item.time}</span>
              <span className="schedule-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      );

    case 'ticket':
      return (
        <div className="el-ticket">
          <h4>{el.props.title}</h4>
          {el.props.tiers.map((tier, idx) => (
            <div key={idx} className="ticket-tier">
              <div className="ticket-tier-name">{tier.name}</div>
              <div className="ticket-tier-price">{tier.price}</div>
              <div className="ticket-tier-quota">Sisa {tier.quota} kursi</div>
            </div>
          ))}
        </div>
      );

    case 'map':
      return (
        <div className="el-map">
          <span>{el.props.address}</span>
        </div>
      );

    case 'poll':
      return (
        <div className="el-poll">
          <div className="poll-question">{el.props.question}</div>
          <div className="poll-options">
            {el.props.options.map((opt, idx) => (
              <div key={idx} className="poll-option">
                <input
                  type="radio"
                  id={opt.toLowerCase().replace(/\s+/g, '-')}
                  name="poll"
                  value={opt}
                />
                <label htmlFor={opt.toLowerCase().replace(/\s+/g, '-')}>{opt}</label>
              </div>
            ))}
          </div>
          {el.props.showResults && (
            <div className="poll-results">
              {el.props.options.map((opt) => (
                <div key={opt} className="poll-result">
                  <span>{opt}: {Math.round((Math.random() * 100))}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'guestbook':
      return (
        <div className="el-guestbook">
          <h4>{el.props.title}</h4>
          <textarea
            rows={3}
            placeholder={el.props.placeholder}
            value={el.props.value || ''}
          />
          <button className="btn-primary">Kirim</button>
        </div>
      );

    case 'feedback':
      return (
        <div className="el-feedback">
          <h4>{el.props.title}</h4>
          <div className="feedback-rating">
            {el.props.ratingOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="feedback"
                  value={option}
                />{option}
              </label>
            ))}
          </div>
          <textarea placeholder="Komentar..." />
          <button className="btn-primary">Kirim</button>
        </div>
      );

    case 'sponsor':
      return (
        <div className="el-sponsor">
          <a href={el.props.url} target="_blank" rel="noopener">
            <span>{el.props.name}</span>
          </a>
        </div>
      );

    case 'submit':
      return (
        <button
          className="el-submit"
          style={{ background: el.props.color, color: '#fff', borderRadius: el.props.radius || 8 }}
        >
          {el.props.label}
        </button>
      );

    case 'oke':
      return (
        <button
          className="el-oke"
          style={{ background: el.props.color, color: '#fff', borderRadius: el.props.radius || 8 }}
        >
          {el.props.label}
        </button>
      );

    case 'cancel':
      return (
        <button
          className="el-cancel"
          style={{ background: el.props.color, color: '#fff', borderRadius: el.props.radius || 8 }}
        >
          {el.props.label}
        </button>
      );

    default:
      return null;
  }
}

// Helper function countdown (remains the same)
export function getCountdownUnits(targetDate, now) {
  const target = new Date(targetDate);
  if (!targetDate || isNaN(target)) {
    return [
      { label: 'Hari', value: '00' }, { label: 'Jam', value: '00' },
      { label: 'Menit', value: '00' }, { label: 'Detik', value: '00' },
    ];
  }
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return [
    { label: 'Hari', value: pad(days) }, { label: 'Jam', value: pad(hours) },
    { label: 'Menit', value: pad(minutes) }, { label: 'Detik', value: pad(seconds) },
  ];
}

// ===================== PANEL PROPERTI (ENHANCED) =====================
function PropertiesPanel({ element, onUpdate, onUpdateProps, onDelete, onClosePanel, elementModels }) {
  const p = element.props;
  const model = elementModels[element.type] || {};

  return (
    <div className="properties-content">
      <div className="properties-header">
        <h3>{getComponentMeta(element.type)?.label}</h3>
        <div className="properties-header-actions">
          <button className="icon-btn danger" title="Hapus elemen" onClick={onDelete}>
            <IconTrash />
          </button>
          <button className="icon-btn" title="Tutup panel (elemen tetap dalam mode edit)" onClick={onClosePanel}>
            <IconClose />
          </button>
        </div>
      </div>

      <div className="prop-group">
        <label className="prop-group-label">Posisi & Ukuran</label>
        <div className="prop-row-4">
          {['x', 'y', 'width', 'height'].map((key) => (
            <div className="prop-field" key={key}>
              <label>{key === 'width' ? 'W' : key === 'height' ? 'H' : key.toUpperCase()}</label>
              <input
                type="number"
                value={element[key]}
                onChange={(e) => onUpdate({ [key]: Number(e.target.value) })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Render properties berdasarkan type elemen */}
      {element.type === 'text' && (
        <>
          <PropField label="Isi Teks">
            <textarea rows={2} value={p.content} onChange={(e) => onUpdateProps({ content: e.target.value })} />
          </PropField>
          <PropField label={`Ukuran Font (${p.fontSize}px)`}>
            <input type="range" min={10} max={72} value={p.fontSize} onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })} />
          </PropField>
          <PropField label="Warna">
            <input type="color" value={p.color} onChange={(e) => onUpdateProps({ color: e.target.value })} />
          </PropField>
          <PropField label="Ketebolan">
            <select value={p.fontWeight} onChange={(e) => onUpdateProps({ fontWeight: e.target.value })}>
              <option value="400">Normal</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
            </select>
          </PropField>
        </>
      )}

      {element.type === 'image' && (
        <>
          <PropField label="URL Gambar">
            <input type="text" value={p.src} onChange={(e) => onUpdateProps({ src: e.target.value })} placeholder="https://..." />
          </PropField>
          <PropField label="Teks Alternatif">
            <input type="text" value={p.alt} onChange={(e) => onUpdateProps({ alt: e.target.value })} />
          </PropField>
        </>
      )}

      {element.type === 'button' && (
        <>
          <PropField label="Label Tombol">
            <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
          </PropField>
          <PropField label="Warna Latar">
            <GradientPicker value={p.background} onChange={(val) => onUpdateProps({ background: val })} />
          </PropField>
          <PropField label="Warna Teks">
            <input type="color" value={p.textColor} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
          </PropField>
          <PropField label="Radius Sudut">
            <input type="range" min={0} max={40} value={p.radius} onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
          </PropField>
        </>
      )}

      {element.type === 'shape' && (
        <>
          <PropField label="Warna">
            <GradientPicker value={p.background} onChange={(val) => onUpdateProps({ background: val })} />
          </PropField>
          <PropField label="Radius Sudut">
            <input type="range" min={0} max={100} value={p.radius} onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
          </PropField>
        </>
      )}

      {element.type === 'video' && (
        <>
          <PropField label="URL Video">
            <input type="text" value={p.src} onChange={(e) => onUpdateProps({ src: e.target.value })} placeholder="https://..." />
          </PropField>
          <PropField label="Alt Text">
            <input type="text" value={p.alt} onChange={(e) => onUpdateProps({ alt: e.target.value })} />
          </PropField>
        </>
      )}

      {element.type === 'rsvp' && (
        <>
          <PropField label="Judul Form">
            <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
          </PropField>
          <PropField label="Sub-judul">
            <input type="text" value={p.subtitle} onChange={(e) => onUpdateProps({ subtitle: e.target.value })} />
          </PropField>
          <div className="prop-group checkbox-group">
            <label>
              <input type="checkbox" checked={p.showGuestCount} onChange={(e) => onUpdateProps({ showGuestCount: e.target.checked })} />
              Tampilkan jumlah tamu
            </label>
          </div>
          <PropField label="Label Tombol">
            <input type="text" value={p.buttonLabel} onChange={(e) => onUpdateProps({ buttonLabel: e.target.value })} />
          </PropField>
          <PropField label="Warna Tombol">
            <input type="color" value={p.buttonColor} onChange={(e) => onUpdateProps({ buttonColor: e.target.value })} />
          </PropField>
        </>
      )}

      {element.type === 'schedule' && (
        <PropField label="Rangkaian Acara">
          <div>
            <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} style={{ marginBottom: 8 }} />
            {p.items.map((item, idx) => (
              <div className="schedule-edit-row" key={idx}>
                <input
                  type="text" className="schedule-time-input" value={item.time} placeholder="19:00"
                  onChange={(e) => {
                    const items = [...p.items];
                    items[idx] = { ...items[idx], time: e.target.value };
                    onUpdateProps({ items });
                  }}
                />
                <input
                  type="text" className="schedule-desc-input" value={item.desc} placeholder="Deskripsi acara"
                  onChange={(e) => {
                    const items = [...p.items];
                    items[idx] = { ...items[idx], desc: e.target.value };
                    onUpdateProps({ items });
                  }}
                />
                <button className="icon-btn danger small" onClick={() => onUpdateProps({ items: p.items.filter((_, i) => i !== idx) })}>×</button>
              </div>
            ))}
            <button className="btn-add-row" onClick={() => onUpdateProps({ items: [...p.items, { time: '', desc: '' }] })}>+ Tambah Baris</button>
          </div>
        </PropField>
      )}

      {element.type === 'ticket' && (
        <PropField label="Kategori Tiket">
          <div>
            <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} style={{ marginBottom: 8 }} />
            {p.tiers.map((tier, idx) => (
              <div className="ticket-edit-row" key={idx}>
                <input
                  type="text" className="ticket-name-input" value={tier.name} placeholder="Nama tiket"
                  onChange={(e) => {
                    const tiers = [...p.tiers];
                    tiers[idx] = { ...tiers[idx], name: e.target.value };
                    onUpdateProps({ tiers });
                  }}
                />
                <input
                  type="text" className="ticket-price-input" value={tier.price} placeholder="Rp 0"
                  onChange={(e) => {
                    const tiers = [...p.tiers];
                    tiers[idx] = { ...tiers[idx], price: e.target.value };
                    onUpdateProps({ tiers });
                  }}
                />
                <input
                  type="number" className="ticket-quota-input" value={tier.quota} placeholder="Kuota"
                  onChange={(e) => {
                    const tiers = [...p.tiers];
                    tiers[idx] = { ...tiers[idx], quota: Number(e.target.value) };
                    onUpdateProps({ tiers });
                  }}
                />
                <button className="icon-btn danger small" onClick={() => onUpdateProps({ tiers: p.tiers.filter((_, i) => i !== idx) })}>×</button>
              </div>
            ))}
            <button className="btn-add-row" onClick={() => onUpdateProps({ tiers: [...p.tiers, { name: '', price: '', quota: 0 }] })}>+ Tambah Tiket</button>
          </div>
        </PropField>
      )}

      {element.type === 'map' && (
        <PropField label="Alamat Lokasi">
          <textarea rows={2} value={p.address} onChange={(e) => onUpdateProps({ address: e.target.value })} />
        </PropField>
      )}

      {element.type === 'poll' && (
        <PropField label="Pertanyaan Poll">
          <input type="text" value={p.question} onChange={(e) => onUpdateProps({ question: e.target.value })} />
        </PropField>
      )}

      {element.type === 'guestbook' && (
        <PropField label="Titel Guestbook">
          <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
        </PropField>
      )}

      {element.type === 'feedback' && (
        <PropField label="Titel Feedback">
          <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
        </PropField>
      )}

      {element.type === 'sponsor' && (
        <>
          <PropField label="Nama Sponsor">
            <input type="text" value={p.name} onChange={(e) => onUpdateProps({ name: e.target.value })} />
          </PropField>
          <PropField label="URL Sponsor">
            <input type="text" value={p.url} onChange={(e) => onUpdateProps({ url: e.target.value })} placeholder="https://..." />
          </PropField>
        </>
      )}

      {element.type === 'submit' && (
        <>
          <PropField label="Aksi Submit">
            <select value={p.action} onChange={(e) => onUpdateProps({ action: e.target.value })}>
              <option value="save">Simpan Data</option>
              <option value="redirect">Redirect URL</option>
              <option value="email">Kirim Email</option>
            </select>
          </PropField>
          <PropField label="Warna Tombol">
            <input type="color" value={el.props.color} onChange={(e) => onUpdateProps({ color: e.target.value })} />
          </PropField>
        </>
      )}

      {element.type === 'oke' && (
        <PropField label="Aksi Oke">
          <select value={p.action} onChange={(e) => onUpdateProps({ action: e.target.value })}>
            <option value="close">Tutup Modal</option>
            <option value="next">Langkah Selanjutnya</option>
          </select>
        </PropField>
      )}

      {element.type === 'cancel' && (
        <PropField label="Aksi Batal">
          <select value={p.action} onChange={(e) => onUpdateProps({ action: e.target.value })}>
            <option value="close">Tutup Modal</option>
            <option value="back">Kembali</option>
          </select>
        </PropField>
      )}
    </div>
  );
}

function PropField({ label, children }) {
  return (
    <div className="prop-group">
      <label className="prop-group-label">{label}</label>
      {children}
    </div>
  );
}

// ===================== ICONS (inline SVG, ringan tanpa dependency) =====================
function IconText() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>; }
function IconImage() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>; }
function IconButton() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="4" /></svg>; }
function IconShape() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>; }
function IconVideo() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="14 2 2 7 12 14 22 7 12 2" /><rect x="1" y="4" width="22" height="15" rx="2" /></svg>; }
function IconCountdown() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" /></svg>; }
function IconRsvp() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.9.37 4.14 1.02" /></svg>; }
function IconSchedule() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></svg>; }
function IconTicket() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 100 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 100-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" /></svg>; }
function IconMap() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
function IconBack() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>; }
function IconEye() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>; }
function IconEyeOff() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><path d="M1 1l22 22" /></svg>; }
function IconTrash() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" /></svg>; }
function IconClose() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>; }
function IconSettings() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>; }
function IconPoll() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>; }
function IconGuestbook() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1.2 1.2 0 0 0-.3 1.9l-.5 1.4a1.2 1.2 0 0 0 .5 2.1l1.6 3.7a1.2 1.2 0 0 0 2.1.3l2.3-1.2a1.2 1.2 0 0 0-.3-1.8l-2.2-3.1a1.2 1.2 0 0 0-1.6-.2l-3.1,2.2z" /><circle cx="8.5" cy="8.5" r="3" /></svg>; }
function IconFeedback() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15 22 2 22 15 2 12 2" /><circle cx="12" cy="12" r="4" /></svg>; }
function IconSponsor() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 14l5 5 5-5" /></svg>; }
function IconSubmit() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8H5a2 2 0 00-2 2v2h12v-2a2 2 0 00-2-2H5z" /></svg>; }
function IconOke() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>; }
function IconCancel() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>; }
