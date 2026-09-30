const SkeletonProductPreview = () => {
  return (
    <div className="flex flex-col bg-transparent p-0 border-0 shadow-none animate-pulse">
      {/* Samo slika ima sivi card okvir */}
      <div className="aspect-square w-full rounded-2xl bg-[#EDEDF0] mb-3" />
      {/* Naslov artikla */}
      <div className="w-4/5 h-4 rounded bg-neutral-200 mb-1.5" />
      <div className="w-3/5 h-4 rounded bg-neutral-200 mb-2.5" />
      {/* Donji red: cijena i kružno dugme (bez bordera) */}
      <div className="mt-auto pt-1 flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="w-20 h-5 rounded bg-neutral-200" />
          <div className="w-24 h-3 rounded bg-neutral-100" />
        </div>
        <div className="size-9 rounded-full bg-[#EDEDF0]" />
      </div>
    </div>
  )
}

export default SkeletonProductPreview
