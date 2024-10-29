export default function Home() {
  const keywords: Keywords = data;

  const [selectedKeywords, setSelectedKeywords] = useState<{
    seasons: Set<number>;
    livingThings: Set<number>;
    hue: Set<number>;
    atmosphere: Set<number>;
    locations: Set<number>;
    features: Set<number>;
  }>({
    seasons: new Set(),
    livingThings: new Set(),
    hue: new Set(),
    atmosphere: new Set(),
    locations: new Set(),
    features: new Set(),
  });

  const toggleSelect = (
    category: keyof typeof selectedKeywords,
    index: number
  ) => {
    setSelectedKeywords((prevState) => {
      const newSet = new Set(prevState[category]);

      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }

      return { ...prevState, [category]: newSet };
    });
  };

  return (
    <>
      <h1>本を探す</h1>
    </>
  );
}
