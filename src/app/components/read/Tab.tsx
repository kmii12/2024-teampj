import styles from "./Tab.module.scss";

interface TabProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
  isUnlocked: boolean;
  lockedTab: number | null;
}

export default function Tab({
  activeTab,
  setActiveTab,
  isUnlocked,
  lockedTab,
}: TabProps) {
  const handleTabClick = (index: number) => {
    if (!isUnlocked || lockedTab === index) {
      setActiveTab(index);
    }
  };

  return (
    <nav className={styles.tab}>
      <ul>
        {["ももこ", "ひかる", "れいか"].map((tab, index) => (
          <li
            key={index}
            className={`${activeTab === index + 1 ? styles.activeTab : ""} ${
              isUnlocked && lockedTab !== null && lockedTab !== index + 1
                ? styles.disabled
                : ""
            }`}
            onClick={() => handleTabClick(index + 1)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
}
