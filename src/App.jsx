import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Upload, X, Download, Loader2, ChevronLeft, ChevronRight, Palette, Heart, Leaf, Star, Coffee, Smile, MonitorSmartphone } from 'lucide-react';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Nunito:wght@400;600;700&family=Quicksand:wght@600;700&family=Courier+Prime:wght@400;700&family=Playfair+Display:wght@600;700&display=swap');

  * {
    -webkit-tap-highlight-color: transparent;
  }

  .font-handwriting {
    font-family: 'Caveat', cursive;
  }
  
  .font-sans {
    font-family: 'Nunito', sans-serif;
  }

  /* --- THEME VARIABLES --- */
  .theme-classic {
    --bg-main: #FDF9F1;
    --bg-cal-header: #FAF9F6;
    --tool-main: #8ECAE6;
    --tool-accent: #219EBC;
    --tool-accent-light: rgba(33, 158, 188, 0.2);
    --color-primary: #3b82f6;
    --color-primary-light: #eff6ff;
    --color-primary-ring: #60a5fa;
    --font-theme: 'Nunito', sans-serif;
  }
  
  .theme-sakura {
    --bg-main: #FFF5F8;
    --bg-cal-header: #FFF0F5;
    --tool-main: #FBCFE8;
    --tool-accent: #F472B6;
    --tool-accent-light: rgba(244, 114, 182, 0.2);
    --color-primary: #ec4899;
    --color-primary-light: #fdf2f8;
    --color-primary-ring: #f472b6;
    --font-theme: 'Quicksand', sans-serif;
  }
  
  .theme-matcha {
    --bg-main: #F4FBF4;
    --bg-cal-header: #F0FDF4;
    --tool-main: #A7F3D0;
    --tool-accent: #10B981;
    --tool-accent-light: rgba(16, 185, 129, 0.2);
    --color-primary: #10b981;
    --color-primary-light: #ecfdf5;
    --color-primary-ring: #34d399;
    --font-theme: 'Courier Prime', monospace;
  }
  
  .theme-lavender {
    --bg-main: #F5F3FF;
    --bg-cal-header: #FAF5FF;
    --tool-main: #DDD6FE;
    --tool-accent: #8B5CF6;
    --tool-accent-light: rgba(139, 92, 246, 0.2);
    --color-primary: #8b5cf6;
    --color-primary-light: #f5f3ff;
    --color-primary-ring: #a78bfa;
    --font-theme: 'Playfair Display', serif;
  }
  
  .theme-latte {
    --bg-main: #FAF5F0;
    --bg-cal-header: #F5F0EB;
    --tool-main: #E2D3C8;
    --tool-accent: #A68A73;
    --tool-accent-light: rgba(166, 138, 115, 0.2);
    --color-primary: #8b5a2b;
    --color-primary-light: #fdf8f5;
    --color-primary-ring: #d2b48c;
    --font-theme: 'Caveat', cursive;
  }

  /* --- MOBILE UTILITIES --- */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* --- INTERACTIVE TRAY BUTTONS --- */
  .interactive-btn {
    border-color: #e5e7eb;
    color: #9ca3af;
    background-color: white;
    transition: all 0.2s;
  }
  .interactive-btn:not(:disabled):hover {
    border-color: var(--color-primary-ring);
    background-color: var(--color-primary-light);
    color: var(--color-primary);
  }
  .interactive-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .tray-image-active {
    box-shadow: 0 0 0 4px var(--color-primary-ring);
    transform: scale(0.95);
    opacity: 0.5;
  }

  /* Stamp perforation effect */
  .stamp-paper {
    background-color: white;
    padding: 8px;
    -webkit-mask-image: 
      radial-gradient(circle at 0% 50%, transparent 3.5px, black 4px),
      radial-gradient(circle at 100% 50%, transparent 3.5px, black 4px),
      radial-gradient(circle at 50% 0%, transparent 3.5px, black 4px),
      radial-gradient(circle at 50% 100%, transparent 3.5px, black 4px),
      linear-gradient(black, black);
    -webkit-mask-size: 
      12px 12px,
      12px 12px,
      12px 12px,
      12px 12px,
      calc(100% - 12px) calc(100% - 12px);
    -webkit-mask-position: 
      left center,
      right center,
      center top,
      center bottom,
      center;
    -webkit-mask-repeat: 
      repeat-y,
      repeat-y,
      repeat-x,
      repeat-x,
      no-repeat;
    mask-image: 
      radial-gradient(circle at 0% 50%, transparent 3.5px, black 4px),
      radial-gradient(circle at 100% 50%, transparent 3.5px, black 4px),
      radial-gradient(circle at 50% 0%, transparent 3.5px, black 4px),
      radial-gradient(circle at 50% 100%, transparent 3.5px, black 4px),
      linear-gradient(black, black);
    mask-size: 
      12px 12px,
      12px 12px,
      12px 12px,
      12px 12px,
      calc(100% - 12px) calc(100% - 12px);
    mask-position: 
      left center,
      right center,
      center top,
      center bottom,
      center;
    mask-repeat: 
      repeat-y,
      repeat-y,
      repeat-x,
      repeat-x,
      no-repeat;
    border-radius: 2px;
  }

  .stamp-shadow {
    filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.25));
  }

  /* Tool punch animation */
  @keyframes punch {
    0% { transform: translate(-50%, var(--punch-start-y)) scale(1); }
    40% { transform: translate(-50%, calc(var(--punch-start-y) + 5%)) scale(0.95); }
    100% { transform: translate(-50%, var(--punch-start-y)) scale(1); }
  }

  .animate-punch {
    animation: punch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Cell appearance animation */
  @keyframes popIn {
    0% { transform: scale(0.8) rotate(var(--rot)); opacity: 0; }
    100% { transform: scale(1) rotate(var(--rot)); opacity: 1; }
  }

  .animate-pop {
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const THEMES = [
  { id: 'classic', name: 'Classic Blue', color: '#8ECAE6' },
  { id: 'sakura', name: 'Sakura Pink', color: '#FBCFE8' },
  { id: 'matcha', name: 'Matcha Green', color: '#A7F3D0' },
  { id: 'lavender', name: 'Lavender Purple', color: '#DDD6FE' },
  { id: 'latte', name: 'Latte Brown', color: '#E2D3C8' },
];

const DEFAULT_STICKERS = ['🎀', '💖', '🌸', '✨', '⭐', '📌', '📍', '🌼', '🦋', '🎈', '🎉', '🧸', '☕', '🍰', '💌', '🐾', '🍀', '🍎', '🎨', '🎵'];


const WashiTape = ({ color, top, left, right, bottom, rotate, width = "120px", height = "30px" }) => (
  <div 
    className="absolute pointer-events-none mix-blend-multiply opacity-50 shadow-sm"
    style={{ top, left, right, bottom, transform: `rotate(${rotate}deg)`, width, height, backgroundColor: color }}
  />
);

const ThemeDecorations = ({ theme }) => {
  if (theme === 'classic') return null;

  const elements = {
    sakura: (
      <>
        <WashiTape color="#F472B6" top="15%" left="8%" rotate="-15" />
        <WashiTape color="#F9A8D4" bottom="25%" right="10%" rotate="25" />
        <Heart fill="#FBCFE8" color="#F472B6" className="absolute top-1/4 right-[15%] w-12 h-12 md:w-16 md:h-16 rotate-[15deg] opacity-60" />
        <Heart fill="#F9A8D4" color="#F472B6" className="absolute bottom-1/3 left-[10%] w-8 h-8 md:w-10 md:h-10 -rotate-12 opacity-50" />
      </>
    ),
    matcha: (
      <>
        <WashiTape color="#34D399" top="18%" right="12%" rotate="12" />
        <WashiTape color="#6EE7B7" bottom="20%" left="8%" rotate="-20" />
        <Leaf fill="#A7F3D0" color="#10B981" className="absolute top-[30%] left-[12%] w-12 h-12 md:w-16 md:h-16 -rotate-[30deg] opacity-60" />
        <Leaf fill="#D1FAE5" color="#34D399" className="absolute bottom-[25%] right-[15%] w-10 h-10 md:w-12 md:h-12 rotate-[25deg] opacity-50" />
      </>
    ),
    lavender: (
      <>
        <WashiTape color="#A78BFA" top="20%" left="15%" rotate="-8" />
        <WashiTape color="#C4B5FD" bottom="15%" right="12%" rotate="18" />
        <Star fill="#DDD6FE" color="#8B5CF6" className="absolute top-[25%] right-[20%] w-12 h-12 md:w-16 md:h-16 rotate-[20deg] opacity-60" />
        <Star fill="#EDE9FE" color="#A78BFA" className="absolute bottom-[30%] left-[15%] w-8 h-8 md:w-10 md:h-10 -rotate-[15deg] opacity-50" />
      </>
    ),
    latte: (
      <>
        <WashiTape color="#A68A73" top="12%" right="15%" rotate="20" />
        <WashiTape color="#D6C4B6" bottom="22%" left="12%" rotate="-15" />
        <Coffee fill="#E2D3C8" color="#A68A73" className="absolute top-[40%] left-[10%] w-10 h-10 md:w-14 md:h-14 -rotate-[15deg] opacity-60" />
        <Coffee fill="#F5F0EB" color="#D6C4B6" className="absolute bottom-[20%] right-[12%] w-10 h-10 md:w-12 md:h-12 rotate-[12deg] opacity-70" />
      </>
    ),
  };

  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">{elements[theme]}</div>;
};

const generateGrid = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; 
  const totalCells = Math.max(35, Math.ceil((startOffset + daysInMonth) / 7) * 7); 
  
  return Array.from({ length: totalCells }, (_, i) => ({
    id: i,
    dayNumber: (i >= startOffset && i < startOffset + daysInMonth) ? i - startOffset + 1 : null,
    imageUrl: null,
    rotation: (Math.random() * 8) - 4,
    stickers: []
  }));
};

const CropModal = ({ src, onPunch, onClose }) => {
  const imgRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);
  const BOX_SIZE = 150; 

  const updateMousePos = (clientX, clientY) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (e) => updateMousePos(e.clientX, e.clientY);
  const handleTouchMove = (e) => updateMousePos(e.touches[0].clientX, e.touches[0].clientY);

  const handlePunchClick = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    
    const cx = mousePos ? mousePos.x : rect.width / 2;
    const cy = mousePos ? mousePos.y : rect.height / 2;

    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    
    const sourceX = (cx - BOX_SIZE/2) * scaleX;
    const sourceY = (cy - BOX_SIZE/2) * scaleY;
    const sourceW = BOX_SIZE * scaleX;
    const sourceH = BOX_SIZE * scaleY;
    
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0,300,300);
    ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, 300, 300);
    
    onPunch(canvas.toDataURL('image/png'));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col max-h-[95vh] w-full max-w-2xl overflow-hidden animate-pop">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-lg sm:text-xl text-gray-800">Punch a Stamp</h2>
            <p className="text-xs sm:text-sm text-gray-500">Move pointer to aim, tap to punch a section.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 bg-gray-50 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          <div 
            className="relative cursor-crosshair shadow-md overflow-hidden bg-white inline-block max-w-full touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
            onMouseLeave={() => setMousePos(null)}
            onClick={handlePunchClick}
          >
            <img 
              ref={imgRef}
              src={src} 
              alt="Crop source"
              className="max-h-[50vh] max-w-full object-contain block pointer-events-none"
              crossOrigin="anonymous"
            />
            
            <div 
              className="absolute pointer-events-none"
              style={{
                width: BOX_SIZE,
                height: BOX_SIZE,
                left: mousePos ? mousePos.x - BOX_SIZE/2 : 'calc(50% - 75px)',
                top: mousePos ? mousePos.y - BOX_SIZE/2 : 'calc(50% - 75px)',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
              }}
            >
              <div className="w-full h-full border-2 border-white/80 relative">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/50" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/50" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={() => onPunch(src)} 
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Use Full Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [showThemes, setShowThemes] = useState(false);
  
  const [showStickers, setShowStickers] = useState(false);
  const [customStickers, setCustomStickers] = useState([]);
  const [newStickerInput, setNewStickerInput] = useState('');
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  
  const [currentDate, setCurrentDate] = useState(() => new Date());
  
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  const [monthlyGrids, setMonthlyGrids] = useState(() => ({
    [monthKey]: generateGrid(currentDate.getFullYear(), currentDate.getMonth())
  }));

  const [trayImages, setTrayImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mobileDraggedCellId, setMobileDraggedCellId] = useState(null);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isPunching, setIsPunching] = useState(false);
  const [cropSource, setCropSource] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowMobileWarning(true);
    }
  }, []);

  useEffect(() => {
    if (!monthlyGrids[monthKey]) {
      setMonthlyGrids(prev => ({ ...prev, [monthKey]: generateGrid(currentDate.getFullYear(), currentDate.getMonth()) }));
    }
  }, [monthKey, currentDate, monthlyGrids]);

  const grid = monthlyGrids[monthKey] || [];
  const allStickers = [...DEFAULT_STICKERS, ...customStickers];

  const setGrid = useCallback((updater) => {
    setMonthlyGrids(prevGrids => {
      const currentMonthGrid = prevGrids[monthKey] || generateGrid(currentDate.getFullYear(), currentDate.getMonth());
      const newGrid = typeof updater === 'function' ? updater(currentMonthGrid) : updater;
      return { ...prevGrids, [monthKey]: newGrid };
    });
  }, [monthKey, currentDate]);

  const executeSwap = useCallback((sourceId, targetId) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const sourceIdx = newGrid.findIndex(c => c.id === sourceId);
      const targetIdx = newGrid.findIndex(c => c.id === targetId);

      if (sourceIdx === -1 || targetIdx === -1 || sourceId === targetId) return prev;

      const sourceCell = newGrid[sourceIdx];
      const targetCell = newGrid[targetIdx];

      const tempImg = targetCell.imageUrl;
      const tempRot = targetCell.rotation;
      const tempStickers = targetCell.stickers || [];

      newGrid[targetIdx] = { ...targetCell, imageUrl: sourceCell.imageUrl, rotation: sourceCell.rotation, stickers: sourceCell.stickers || [], justAdded: true };
      newGrid[sourceIdx] = { ...sourceCell, imageUrl: tempImg, rotation: tempRot, stickers: tempStickers, justAdded: false };

      return newGrid;
    });

    setTimeout(() => {
      setGrid(prev => prev.map(cell => cell.id === targetId ? { ...cell, justAdded: false } : cell));
    }, 400);
  }, [setGrid]);

  useEffect(() => {
    const handlePointerMove = (clientX, clientY, isTouch) => {
      if (isTouch) setIsTouchDevice(true);
      requestAnimationFrame(() => {
        setMousePos({ x: clientX, y: clientY });
      });
    };

    const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY, false);
    const handleTouchMove = (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, true);
    
    const handleTouchEnd = (e) => {
      if (mobileDraggedCellId !== null) {
        const touch = e.changedTouches[0];
        const elem = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetCell = elem?.closest('[data-cell-id]');
        if (targetCell) {
          const targetId = parseInt(targetCell.getAttribute('data-cell-id'), 10);
          if (!isNaN(targetId)) executeSwap(mobileDraggedCellId, targetId);
        }
        setMobileDraggedCellId(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null); setSelectedSticker(null); setShowThemes(false); setShowStickers(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileDraggedCellId, executeSwap]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        setTrayImages(prev => [newImage, ...prev]);
        setCropSource(newImage); 
        setSelectedSticker(null); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomSticker = () => {
    const val = newStickerInput.trim();
    if (val) {
      if (!DEFAULT_STICKERS.includes(val) && !customStickers.includes(val)) {
        setCustomStickers(prev => [...prev, val]);
      }
      setSelectedSticker(val);
      setShowStickers(false);
      setSelectedImage(null);
      setNewStickerInput('');
    }
  };

  const handleCellClick = useCallback((cellId, e) => {
    if (selectedImage) {
      setIsPunching(true);
      setGrid(prev => prev.map(cell => cell.id === cellId ? { ...cell, imageUrl: selectedImage, justAdded: true } : cell));
      setTimeout(() => { setIsPunching(false); setSelectedImage(null); }, 200);
      setTimeout(() => setGrid(prev => prev.map(cell => cell.id === cellId ? { ...cell, justAdded: false } : cell)), 400);
    } else if (selectedSticker) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX || e.nativeEvent.changedTouches?.[0]?.clientX || 0) - rect.left) / rect.width * 100;
      const y = ((e.clientY || e.nativeEvent.changedTouches?.[0]?.clientY || 0) - rect.top) / rect.height * 100;
      
      const newSticker = {
        id: Date.now() + Math.random(),
        emoji: selectedSticker,
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(10, Math.min(90, y)),
        rotation: (Math.random() * 40) - 20,
        scale: (Math.random() * 0.4) + 0.8
      };
      setGrid(prev => prev.map(cell => cell.id === cellId ? { ...cell, stickers: [...(cell.stickers || []), newSticker] } : cell));
    }
  }, [selectedImage, selectedSticker, setGrid]);

  const handleRemoveImage = (e, cellId) => {
    if (selectedImage || selectedSticker || mobileDraggedCellId !== null) return;
    e.stopPropagation(); 
    setGrid(prev => prev.map(cell => cell.id === cellId ? { ...cell, imageUrl: null } : cell));
  };

  const handleRemoveSticker = (e, cellId, stickerId) => {
    if (selectedImage || selectedSticker || mobileDraggedCellId !== null) return;
    e.stopPropagation();
    setGrid(prev => prev.map(cell => cell.id === cellId ? { ...cell, stickers: (cell.stickers || []).filter(s => s.id !== stickerId) } : cell));
  };

  const handleDragStart = (e, cellId) => {
    if (isTouchDevice) return; 
    e.dataTransfer.setData('cellId', cellId);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
  const handleDrop = (e, targetCellId) => {
    e.preventDefault();
    const sourceCellId = parseInt(e.dataTransfer.getData('cellId'), 10);
    if (!isNaN(sourceCellId)) executeSwap(sourceCellId, targetCellId);
  };

  const handleTouchStartStamp = (e, cellId) => {
    if (selectedImage || selectedSticker) return;
    setMobileDraggedCellId(cellId);
  };

  const handleDownload = async () => {
    if (!calendarRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const htmlToImage = await import('https://esm.sh/html-to-image');
      const dataUrl = await htmlToImage.toPng(calendarRef.current, { 
        quality: 1.0, 
        pixelRatio: 3, 
        backgroundColor: '#ffffff' 
      });
      const link = document.createElement('a');
      link.download = `ScrapIt-${MONTHS[currentDate.getMonth()]}-${currentDate.getFullYear()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { console.error('Failed to download scrapbook:', err); } finally { setIsDownloading(false); }
  };

  const handlePrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  // --- COMPONENTS ---
  const Stamp = ({ src, rotation = 0, popAnimation = false, isTool = false, isDragging = false, draggable, onDragStart, onTouchStart }) => (
    <div 
      draggable={draggable}
      onDragStart={onDragStart}
      onTouchStart={onTouchStart}
      className={`stamp-shadow absolute inset-1 sm:inset-2 z-10 ${popAnimation ? 'animate-pop' : 'transition-transform duration-300'} ${!isTool ? 'hover:scale-105 touch-none' : ''} ${isDragging ? 'opacity-30' : 'opacity-100'}`}
      style={{ '--rot': `${rotation}deg`, transform: `rotate(${rotation}deg)` }}
    >
      <div className={`stamp-paper w-full h-full flex items-center justify-center relative ${!isTool ? 'pointer-events-auto group cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}>
        <img src={src} alt="Scrapbook stamp" className="w-full h-full object-cover pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div 
      className={`min-h-screen font-sans overflow-hidden flex flex-col relative theme-${currentTheme} transition-colors duration-500`}
      style={{ backgroundColor: 'var(--bg-main)' }}
    >
      <style>{customStyles}</style>
      <ThemeDecorations theme={currentTheme} />

      {showMobileWarning && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full flex flex-col items-center text-center animate-pop">
            <div className="w-14 h-14 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <MonitorSmartphone size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-sans">For the Best Experience</h2>
            <p className="text-gray-600 mb-6 text-sm font-sans leading-relaxed">
              This scrapbook app is highly interactive! While it works on mobile, we strongly recommend opening it on a desktop computer or enabling <strong>Desktop Site</strong> in your mobile browser settings for the ultimate experience.
            </p>
            <button 
              onClick={() => setShowMobileWarning(false)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      )}

      <div className="w-full text-center pt-6 z-10 relative select-none px-4">
        <h1 className="font-handwriting text-5xl md:text-6xl text-gray-800 drop-shadow-sm">
          Scrap Book
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start sm:justify-center p-0 sm:p-4 md:p-8 mb-32 z-10 relative">
        
        <div className="w-full max-w-4xl flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-2 px-2 sm:px-4 select-none mt-4 sm:mt-0">
          <button onClick={handlePrevMonth} className="p-1 sm:p-1.5 bg-white border border-gray-100 shadow-sm hover:bg-gray-50 rounded-full transition-colors text-gray-500 hover:text-gray-800">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 tracking-wide min-w-[140px] sm:min-w-[200px] text-center transition-all duration-500" style={{ fontFamily: 'var(--font-theme)' }}>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={handleNextMonth} className="p-1 sm:p-1.5 bg-white border border-gray-100 shadow-sm hover:bg-gray-50 rounded-full transition-colors text-gray-500 hover:text-gray-800">
            <ChevronRight size={20} />
          </button>
        </div>

        <div 
          ref={calendarRef}
          className={`w-full max-w-4xl aspect-[4/5] sm:aspect-[4/3] min-h-[400px] bg-white border-y sm:border border-gray-200 sm:shadow-sm flex flex-col select-none overflow-hidden relative ${(selectedImage || selectedSticker || mobileDraggedCellId !== null) ? 'touch-none' : ''}`}
        >
          <div className="w-full px-3 sm:px-6 py-3 sm:py-4 bg-white flex items-baseline gap-2 border-b border-gray-100 shrink-0 z-10">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 tracking-tight transition-all duration-500" style={{ fontFamily: 'var(--font-theme)' }}>
              {MONTHS[currentDate.getMonth()]}
            </h2>
            <span className="text-sm sm:text-lg text-gray-400 font-medium transition-all duration-500" style={{ fontFamily: 'var(--font-theme)' }}>
              {currentDate.getFullYear()}
            </span>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-200 shrink-0 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-cal-header)' }}>
            {DAYS_OF_WEEK.map((day, i) => (
              <div key={i} className="text-center py-1 sm:py-2 text-[10px] sm:text-sm text-gray-500 border-r border-gray-200 last:border-r-0 transition-all duration-500" style={{ fontFamily: 'var(--font-theme)' }}>
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7 auto-rows-fr">
            {grid.map((cell) => (
              <div 
                key={cell.id}
                data-cell-id={cell.id}
                onClick={(e) => handleCellClick(cell.id, e)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, cell.id)}
                className={`
                  relative border-b border-r border-gray-100 last:border-r-0 min-h-[50px]
                  ${(selectedImage || selectedSticker) ? 'cursor-none hover:bg-black/5' : 'cursor-default'}
                  transition-colors duration-200 group
                `}
              >
                {cell.dayNumber && (
                  <span className="absolute top-0.5 sm:top-1 left-1 sm:left-2 text-[10px] sm:text-xs text-gray-400 font-medium z-0">
                    {cell.dayNumber}
                  </span>
                )}
                
                {cell.imageUrl && (
                  <>
                    <Stamp 
                      src={cell.imageUrl} 
                      rotation={cell.rotation} 
                      popAnimation={cell.justAdded}
                      isDragging={mobileDraggedCellId === cell.id}
                      draggable={!selectedImage && !selectedSticker}
                      onDragStart={(e) => handleDragStart(e, cell.id)}
                      onTouchStart={(e) => handleTouchStartStamp(e, cell.id)}
                    />
                    {!selectedImage && !selectedSticker && mobileDraggedCellId === null && (
                      <button 
                        onClick={(e) => handleRemoveImage(e, cell.id)}
                        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-md hover:bg-red-600 scale-75 sm:scale-100"
                        title="Remove stamp"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </>
                )}

                {cell.stickers?.map(sticker => (
                  <div 
                    key={sticker.id}
                    className={`absolute z-20 animate-pop ${(!selectedImage && !selectedSticker) ? 'hover:scale-125 cursor-pointer' : 'pointer-events-none'}`}
                    style={{ left: `${sticker.x}%`, top: `${sticker.y}%`, transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})` }}
                    onClick={(e) => handleRemoveSticker(e, cell.id, sticker.id)}
                  >
                    <span className="text-xl sm:text-2xl drop-shadow-sm select-none" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.15))' }}>
                      {sticker.emoji}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute bottom-1 right-2 text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-400 opacity-40 z-0 pointer-events-none select-none tracking-widest transition-all duration-500" style={{ fontFamily: 'var(--font-theme)' }}>
            ScrapIt
          </div>
        </div>
      </div>

      {showThemes && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:left-24 sm:translate-x-0 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex gap-2 sm:gap-3 animate-pop z-50">
           {THEMES.map(t => (
             <button 
               key={t.id} onClick={() => { setCurrentTheme(t.id); setShowThemes(false); }}
               className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${currentTheme === t.id ? 'border-gray-800 scale-110' : 'border-transparent hover:scale-110'} transition-transform shadow-sm`}
               style={{ backgroundColor: t.color }} title={t.name}
             />
           ))}
        </div>
      )}

      {showStickers && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:left-[200px] sm:translate-x-0 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2 animate-pop z-50 w-[90vw] max-w-[260px]">
          <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Select a Sticker</div>
          
          <div className="grid grid-cols-5 gap-1 sm:gap-2 max-h-[160px] overflow-y-auto hide-scrollbar pb-1">
             {allStickers.map(emoji => (
               <button 
                 key={emoji}
                 onClick={() => { setSelectedSticker(emoji); setShowStickers(false); setSelectedImage(null); }}
                 className={`text-xl sm:text-2xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 hover:scale-110 transition-all ${selectedSticker === emoji ? 'bg-blue-50 border-2 border-blue-200 scale-110' : 'border border-transparent'}`}
               >
                 {emoji}
               </button>
             ))}
          </div>

          <div className="mt-1 pt-2 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              maxLength={4}
              placeholder="add sticker"
              value={newStickerInput}
              onChange={(e) => setNewStickerInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomSticker(); }}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm text-center outline-none focus:border-blue-400 focus:bg-white transition-colors"
            />
            <button
              onClick={handleAddCustomSticker}
              disabled={!newStickerInput.trim()}
              className="bg-blue-50 text-blue-500 w-8 h-8 sm:w-10 sm:h-8 rounded-lg font-bold hover:bg-blue-100 disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM PART */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 sm:p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 overscroll-x-contain">
        <div className="max-w-5xl mx-auto flex items-center gap-3 sm:gap-4 overflow-x-auto hide-scrollbar pb-1 sm:pb-2 px-1 sm:px-2">
          
          <button onClick={handleDownload} disabled={isDownloading} className="interactive-btn flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 group">
            {isDownloading ? <Loader2 size={18} className="mb-0.5 sm:mb-1 animate-spin" /> : <Download size={18} className="mb-0.5 sm:mb-1 group-hover:-translate-y-0.5 transition-transform" />}
            <span className="text-[9px] sm:text-[10px] font-medium">{isDownloading ? 'Saving' : 'Save'}</span>
          </button>

          <button onClick={() => { setShowThemes(!showThemes); setShowStickers(false); }} className="interactive-btn flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 group relative">
            <Palette size={18} className="mb-0.5 sm:mb-1 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[9px] sm:text-[10px] font-medium">Theme</span>
            <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-colors duration-500" style={{ backgroundColor: 'var(--tool-main)' }} />
          </button>

          <button onClick={() => { setShowStickers(!showStickers); setShowThemes(false); }} className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 group transition-all duration-200 ${(showStickers || selectedSticker) ? 'border-blue-400 bg-blue-50 text-blue-500' : 'interactive-btn'}`}>
            <Smile size={18} className="mb-0.5 sm:mb-1 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[9px] sm:text-[10px] font-medium">Stickers</span>
          </button>

          <div className="w-px h-8 sm:h-10 bg-gray-200 shrink-0 mx-1 sm:mx-2"></div>

          <label className="interactive-btn flex-shrink-0 cursor-pointer flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-dashed group">
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <Upload size={18} className="mb-0.5 sm:mb-1 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[9px] sm:text-[10px] font-medium">Add</span>
          </label>

          {trayImages.map((src, idx) => (
            <button key={idx} onClick={() => { setCropSource(src); setSelectedSticker(null); }} className={`flex-shrink-0 relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-sm transition-all ${selectedImage === src ? 'tray-image-active' : 'hover:-translate-y-1 hover:shadow-md'}`}>
              <img src={src} alt={`Tray ${idx}`} className="w-full h-full object-cover pointer-events-none" />
            </button>
          ))}

        </div>
      </div>

      
      {selectedImage && (
        <div 
          className={`fixed pointer-events-none z-50 ${isPunching ? 'animate-punch' : ''}`}
          style={{ '--punch-start-y': isTouchDevice ? '-120%' : '-40%', left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: `translate(-50%, var(--punch-start-y))` }}
        >
          <div className="w-32 h-52 sm:w-40 sm:h-64 rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.3),inset_0_4px_10px_rgba(255,255,255,0.5)] border-4 flex flex-col items-center pt-6 sm:pt-8 relative overflow-hidden backdrop-blur-sm transition-colors duration-500 scale-90 sm:scale-100" style={{ backgroundColor: 'var(--tool-main)', borderColor: 'var(--tool-accent-light)' }}>
            <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-white/20 rounded-t-full"></div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#E2E8F0]/80 rounded-lg shadow-[inset_0_5px_15px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden relative border-2 border-white/30">
              <div className="w-16 h-16 sm:w-20 sm:h-20 opacity-90 scale-90">
                <Stamp src={selectedImage} isTool={true} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-full h-[1px] bg-red-400/30"></div><div className="h-full w-[1px] bg-red-400/30 absolute"></div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 w-8 sm:w-10 h-1.5 sm:h-2 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] opacity-60 transition-colors duration-500" style={{ backgroundColor: 'var(--tool-accent)' }}></div>
            <div className="mt-3 sm:mt-4 w-24 sm:w-28 h-16 sm:h-20 rounded-xl shadow-[inset_0_5px_10px_rgba(0,0,0,0.1)] border-t border-white/40 flex items-end justify-center pb-2 transition-colors duration-500" style={{ backgroundColor: 'var(--tool-accent-light)' }}>
               <div className="flex gap-1.5 sm:gap-2 opacity-50">
                 <div className="w-1 sm:w-1.5 h-4 sm:h-6 rounded-full transition-colors duration-500" style={{ backgroundColor: 'var(--tool-accent)' }}></div>
                 <div className="w-1 sm:w-1.5 h-4 sm:h-6 rounded-full transition-colors duration-500" style={{ backgroundColor: 'var(--tool-accent)' }}></div>
                 <div className="w-1 sm:w-1.5 h-4 sm:h-6 rounded-full transition-colors duration-500" style={{ backgroundColor: 'var(--tool-accent)' }}></div>
               </div>
            </div>
            <div className="absolute bottom-3 sm:bottom-4 text-[8px] sm:text-[10px] text-white/70 font-bold uppercase tracking-widest text-center w-full">
              Tap to Stamp
            </div>
          </div>
        </div>
      )}

      {selectedSticker && !selectedImage && (
        <div 
          className="fixed pointer-events-none z-50 flex flex-col items-center"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: `translate(-50%, ${isTouchDevice ? '-150%' : '-50%'})` }}
        >
          <span className="text-3xl sm:text-4xl drop-shadow-md animate-pop">{selectedSticker}</span>
          <div className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] text-gray-500 font-bold bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-100 hidden md:block">
            Click to place • ESC to drop
          </div>
        </div>
      )}

      {mobileDraggedCellId !== null && isTouchDevice && (
        <div 
          className="fixed pointer-events-none z-[60]"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: `translate(-50%, -100%) scale(1.1)` }}
        >
          <div className="w-20 h-20 opacity-80 animate-pop">
            <Stamp src={grid.find(c => c.id === mobileDraggedCellId)?.imageUrl} isTool={true} />
          </div>
        </div>
      )}
      
      {cropSource && (
        <CropModal 
          src={cropSource} 
          onPunch={(croppedImg) => { setSelectedImage(croppedImg); setCropSource(null); }} 
          onClose={() => setCropSource(null)} 
        />
      )}
      
    </div>
  );
}