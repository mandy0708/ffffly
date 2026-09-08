export type SketchbookImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const files: { name: string; width: number; height: number }[] = [
  { name: "1岁参加高考_1.jpg", width: 1042, height: 1900 },
  { name: "1岁参加高考_封面.jpg", width: 1250, height: 532 },
  { name: "20.png", width: 6542, height: 4500 },
  { name: "中秋-01.jpg", width: 4326, height: 2706 },
  { name: "小正-气球.png", width: 3597, height: 3463 },
  { name: "小正-采花.png", width: 3597, height: 3463 },
  { name: "手机壳-03.png", width: 1059, height: 2127 },
  { name: "手机壳-04.png", width: 1059, height: 2127 },
  { name: "范大先知活动海报1111_1-01.png", width: 1125, height: 2436 },
  { name: "范式词典_1.jpg", width: 1563, height: 3384 },
  { name: "范式词典_3.jpg", width: 1564, height: 3384 },
  { name: "范式词典_头图.jpg", width: 1233, height: 534 },
  { name: "超级符号-毛绒.png", width: 1590, height: 1590 },
  { name: "截屏2026-09-08 10.00.55.png", width: 1678, height: 1240 },
  { name: "2-1.jpg", width: 1875, height: 1875 },
  { name: "2-2.jpg", width: 1875, height: 1875 },
  { name: "520_1.jpg", width: 1042, height: 2186 },
  { name: "线上司龄徽章及IP刺绣贴展示-02.jpg", width: 1920, height: 2755 },
  { name: "线上司龄徽章及IP刺绣贴展示_画板 1.jpg", width: 1920, height: 2758 },
  { name: "世界地球日-插画版_1.jpg", width: 1726, height: 3384 },
  { name: "世界地球日-插画版_2.jpg", width: 1725, height: 3384 },
  { name: "世界地球日-插画版_3.jpg", width: 1726, height: 3384 },
  { name: "世界地球日-插画版_封面.jpg", width: 1958, height: 834 },
  { name: "愚人节_画板 1.png", width: 1389, height: 1389 },
  { name: "愚人节_画板 1 副本.png", width: 1389, height: 1389 },
  { name: "愚人节_画板 1 副本 2.png", width: 1389, height: 1389 },
  { name: "脉脉-新年新flag-01.jpg", width: 960, height: 960 },
  { name: "脉脉-新年新flag-04.jpg", width: 960, height: 960 },
  { name: "脉脉-新年新flag-07.jpg", width: 960, height: 960 },
  { name: "Frame 2147223842.png", width: 912, height: 912 },
  { name: "Frame 2147224632.png", width: 1620, height: 1620 },
  { name: "校招-天才实习生_画板 1 副本 3.png", width: 2344, height: 16771 },
];

function toAlt(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ").trim();
}

export const sketchbookImages: SketchbookImage[] = files.map((file) => ({
  src: `/images/sketchbook/${encodeURIComponent(file.name)}`,
  alt: toAlt(file.name),
  width: file.width,
  height: file.height,
}));
