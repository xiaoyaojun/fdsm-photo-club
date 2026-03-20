"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import ExifReader from "exifreader";
import { Upload as UploadIcon, ImagePlus, X, Camera, Aperture, Timer, Sun, Tag, MapPin, ChevronRight, Check, Sparkles, Lock, LogIn } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* ===== TAGS ===== */
const availableTags = ["风光", "人像", "街拍", "城市", "星空", "海洋", "山脉", "森林", "日落", "夜景", "胶片", "光影", "雾", "湖", "乡村"];

/* ===== PAGE ===== */
export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("fdsm-auth");
    setIsLoggedIn(auth === "true");
    setCheckingAuth(false);
  }, []);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [activePreview, setActivePreview] = useState(0);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [focalLength, setFocalLength] = useState("");
  const [aperture, setAperture] = useState("");
  const [shutter, setShutter] = useState("");
  const [iso, setIso] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [exifLoaded, setExifLoaded] = useState(false);

  /* ===== EXIF EXTRACTION ===== */
  const extractExif = useCallback(async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const tags = ExifReader.load(arrayBuffer);

      const cameraMake = tags["Make"]?.description || "";
      const cameraModel = tags["Model"]?.description || "";
      const lensMake = tags["LensMake"]?.description || "";
      const lensModel = tags["LensModel"]?.description || "";
      const focal = tags["FocalLength"]?.description || "";
      const fNum = tags["FNumber"]?.description || tags["ApertureValue"]?.description || "";
      const exposure = tags["ExposureTime"]?.description || tags["ShutterSpeedValue"]?.description || "";
      const isoVal = tags["ISOSpeedRatings"]?.description || tags["PhotographicSensitivity"]?.description || "";
      const gpsLat = tags["GPSLatitude"]?.description || "";
      const gpsLon = tags["GPSLongitude"]?.description || "";

      // Build camera string
      const cameraStr = [cameraMake, cameraModel].filter(Boolean).join(" ");

      // Build lens string (prefer LensModel, fallback to combining)
      const lensStr = lensModel || [lensMake, focal].filter(Boolean).join(" ");

      // Format focal length
      const focalStr = focal ? (focal.includes("mm") ? focal : `${focal}mm`) : "";

      // Format aperture
      const apertureStr = fNum
        ? fNum.startsWith("f/") ? fNum : `f/${fNum.replace(/[^0-9.]/g, "")}`
        : "";

      // Format shutter speed - expose as human-readable
      let shutterStr = exposure || "";
      // If exposure is a decimal like "0.008", convert to fraction
      if (shutterStr && !shutterStr.includes("/") && parseFloat(shutterStr) < 1) {
        const val = parseFloat(shutterStr);
        const denom = Math.round(1 / val);
        shutterStr = `1/${denom}s`;
      } else if (shutterStr && !shutterStr.endsWith("s") && !shutterStr.includes("/")) {
        shutterStr = `${shutterStr}s`;
      } else if (shutterStr && shutterStr.includes("/")) {
        shutterStr = `${shutterStr}s`;
      }

      // ISO
      const isoStr = isoVal || "";

      // Only fill if at least one field has data
      if (cameraStr || lensStr || focalStr || apertureStr || shutterStr || isoStr) {
        if (cameraStr) setCamera(cameraStr);
        if (lensStr) setLens(lensStr);
        if (focalStr) setFocalLength(focalStr);
        if (apertureStr) setAperture(apertureStr);
        if (shutterStr) setShutter(shutterStr);
        if (isoStr) setIso(isoStr);
        setExifLoaded(true);
      }
    } catch (err) {
      // EXIF read failed silently (no EXIF data, corrupted file, etc.)
      console.log("EXIF read failed:", err);
    }
  }, []);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const imageFiles = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    setFiles((prev) => [...prev, ...imageFiles]);
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Extract EXIF from the first image
    extractExif(imageFiles[0]);
  }, [extractExif]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    if (activePreview >= previews.length - 1) setActivePreview(Math.max(0, previews.length - 2));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 5 ? [...prev, tag] : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  // Success state
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-serif text-[1.8rem] font-bold mb-3">上传成功！</h2>
            <p className="text-[#7a7874] text-[0.95rem] mb-8 max-w-[400px] mx-auto">
              你的作品已提交审核，通过后将会在作品长廊中展示。
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { setSubmitted(false); setFiles([]); setPreviews([]); setTitle(""); setDescription(""); setSelectedTags([]); }}
                className="px-6 py-3 border border-white/[0.08] text-[#7a7874] rounded-md text-[0.82rem] font-medium hover:border-white/[0.15] hover:text-foreground transition-all"
              >
                继续上传
              </button>
              <Link
                href="/works"
                className="px-6 py-3 bg-gold text-[#08080c] rounded-md text-[0.82rem] font-semibold hover:bg-[#d4b87a] transition-all"
              >
                查看作品长廊
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Auth Check */}
        {checkingAuth ? (
          <div className="pt-[clamp(10rem,20vh,16rem)] text-center">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
          </div>
        ) : !isLoggedIn ? (
          <section className="pt-[clamp(10rem,20vh,16rem)] pb-20 px-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#16161e] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-[#4a4845]" />
              </div>
              <h2 className="font-serif text-[1.5rem] font-bold mb-3">需要登录</h2>
              <p className="text-[#7a7874] text-[0.9rem] mb-8 leading-relaxed">
                发布作品需要先登录你的摄影社账号，登录后即可上传照片与大家分享。
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 h-11 px-8 bg-gold text-[#08080c] rounded-md text-[0.85rem] font-semibold hover:bg-[#d4b87a] transition-all"
              >
                <LogIn className="w-4 h-4" />
                前往登录
              </Link>
            </div>
          </section>
        ) : (
        <>
        {/* Header */}
        <section className="pt-[clamp(7rem,10vh,9rem)] pb-6 px-[clamp(1.5rem,4vw,4rem)]">
          <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">Upload</span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-2">发布作品</h1>
          <p className="text-[#7a7874] text-[0.9rem]">上传你的摄影作品，与大家分享你的视角。</p>
        </section>

        <form onSubmit={handleSubmit} className="px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(4rem,8vh,6rem)]">
          <div className="flex flex-col lg:flex-row gap-[clamp(1.5rem,3vw,2.5rem)]">
            {/* Left: Upload Zone + Preview */}
            <div className="flex-1 min-w-0">
              {/* Drop Zone */}
              {previews.length === 0 ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 min-h-[400px] flex flex-col items-center justify-center ${
                    dragActive
                      ? "border-gold bg-gold/[0.03] scale-[1.01]"
                      : "border-white/[0.08] bg-[#0e0e14] hover:border-white/[0.15] hover:bg-[#131319]"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all ${dragActive ? "bg-gold/15" : "bg-[#16161e]"}`}>
                    <UploadIcon className={`w-7 h-7 transition-colors ${dragActive ? "text-gold" : "text-[#4a4845]"}`} />
                  </div>
                  <p className="font-serif text-[1.1rem] font-semibold mb-2">
                    {dragActive ? "松开鼠标上传" : "拖拽照片到这里"}
                  </p>
                  <p className="text-[#5a5855] text-[0.85rem] mb-6">
                    支持 JPG、PNG、WebP 格式，单张不超过 20MB
                  </p>
                  <div className="flex items-center gap-2 text-gold text-[0.8rem] font-medium">
                    <ImagePlus className="w-4 h-4" />
                    或点击选择文件
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </div>
              ) : (
                /* Preview with thumbnails */
                <div>
                  {/* Main Preview */}
                  <div className="relative rounded-xl overflow-hidden bg-[#0e0e14] mb-4">
                    <img
                      src={previews[activePreview]}
                      alt="Preview"
                      className="w-full max-h-[500px] object-contain bg-black"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(activePreview)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 text-[0.7rem] text-white/60 bg-black/50 px-2 py-1 rounded">
                      {files[activePreview]?.name} · {(files[activePreview]?.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    {previews.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActivePreview(i)}
                        className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          activePreview === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={p} alt="" className="w-full h-full object-cover" />
                        {activePreview === i && (
                          <div className="absolute inset-0 bg-gold/10" />
                        )}
                      </button>
                    ))}
                    {/* Add more */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0 w-20 h-20 rounded-lg border border-dashed border-white/[0.1] flex items-center justify-center text-[#4a4845] hover:text-[#7a7874] hover:border-white/[0.2] transition-all"
                    >
                      <ImagePlus className="w-5 h-5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Form Fields */}
            <div className="lg:w-[360px] shrink-0 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-[0.78rem] font-medium text-[#7a7874] mb-2 tracking-wide">
                  作品标题 <span className="text-[#e54d4d]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="给作品起个名字"
                  required
                  className="w-full h-11 px-4 rounded-md border border-white/[0.08] bg-[#0e0e14] text-foreground text-[0.9rem] placeholder-[#4a4845] focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[0.78rem] font-medium text-[#7a7874] mb-2 tracking-wide">
                  作品描述
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="讲讲这张照片背后的故事…"
                  rows={3}
                  className="w-full px-4 py-3 rounded-md border border-white/[0.08] bg-[#0e0e14] text-foreground text-[0.9rem] placeholder-[#4a4845] focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[0.78rem] font-medium text-[#7a7874] mb-2 tracking-wide">
                  <Tag className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                  标签（最多5个）
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded text-[0.72rem] font-medium tracking-wider transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-gold text-[#08080c]"
                          : "text-[#7a7874] bg-[#16161e] hover:bg-[#1a1a24] hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[0.72rem] font-medium tracking-[0.15em] uppercase text-[#4a4845]">
                    拍摄参数（选填）
                  </div>
                  {exifLoaded && (
                    <div className="flex items-center gap-1.5 text-[0.7rem] text-gold bg-gold/[0.08] px-2.5 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      已自动识别 EXIF
                    </div>
                  )}
                </div>
              </div>

              {/* Camera */}
              <div>
                <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">
                  <Camera className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> 机身
                </label>
                <input
                  type="text"
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                  placeholder="如 Sony A7R V"
                  className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all"
                />
              </div>

              {/* Lens */}
              <div>
                <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">
                  <Aperture className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> 镜头
                </label>
                <input
                  type="text"
                  value={lens}
                  onChange={(e) => setLens(e.target.value)}
                  placeholder="如 FE 24-70mm f/2.8 GM II"
                  className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all"
                />
              </div>

              {/* Row: Focal + Aperture */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">焦距</label>
                  <input type="text" value={focalLength} onChange={(e) => setFocalLength(e.target.value)} placeholder="50mm" className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all" />
                </div>
                <div className="flex-1">
                  <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">光圈</label>
                  <input type="text" value={aperture} onChange={(e) => setAperture(e.target.value)} placeholder="f/1.8" className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all" />
                </div>
              </div>

              {/* Row: Shutter + ISO */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">
                    <Timer className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> 快门
                  </label>
                  <input type="text" value={shutter} onChange={(e) => setShutter(e.target.value)} placeholder="1/200s" className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all" />
                </div>
                <div className="flex-1">
                  <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">
                    <Sun className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> ISO
                  </label>
                  <input type="text" value={iso} onChange={(e) => setIso(e.target.value)} placeholder="100" className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[0.75rem] text-[#5a5855] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> 拍摄地点
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="如 上海外滩"
                  className="w-full h-10 px-3 rounded-md border border-white/[0.06] bg-[#0e0e14] text-[0.85rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || files.length === 0 || !title}
                className="w-full h-12 bg-gold text-[#08080c] rounded-md text-[0.85rem] font-semibold tracking-[0.06em] uppercase hover:bg-[#d4b87a] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32" className="text-[#08080c]/30" />
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="24" />
                    </svg>
                    上传中…
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-4 h-4" />
                    发布作品
                  </>
                )}
              </button>

              <p className="text-[0.7rem] text-[#4a4845] text-center">
                上传即表示同意遵守社区规范，作品将经过审核后展示。
              </p>
            </div>
          </div>
        </form>
        </>
        )}
      </main>
      <Footer />
    </>
  );
}
