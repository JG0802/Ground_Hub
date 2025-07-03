const UniformIcon = ({ color = '#000', size = '24px' }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 유니폼 바디 */}
      <path
        d="M16 8 L24 8 C26 12 38 12 40 8 L48 8 L52 20 L44 24 V56 H20 V24 L12 20 L16 8 Z"
        fill={color}
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="round"
      />
  
      {/* 목 라인 */}
      <path
        d="M24 8 Q32 16 40 8"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
  
      {/* 소매 경계선 (왼쪽) */}
      <line
        x1="14"
        y1="20"
        x2="20"
        y2="22"
        stroke="white"
        strokeWidth="2"
      />
  
      {/* 소매 경계선 (오른쪽) */}
      <line
        x1="50"
        y1="20"
        x2="44"
        y2="22"
        stroke="white"
        strokeWidth="2"
      />

    </svg>
  );
  
  export default UniformIcon;
  