import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

type Props = {
  text?: string;
  href: string;
};

//ボタンスタイル（通常）
export default function BtnStyle(props: Props) {
  const [state, setState] = useState<Props>({
    text: props.text,
    href: props.href,
  });

  return (
    <button>
      <Link href={state.href}></Link>
    </button>
  );
}
