<style>{`
  @keyframes gradientShine {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .gradient-border {
    background: linear-gradient(90deg, #ef4444, #22c55e, #3b82f6, #ef4444);
    background-size: 200% 200%;
    animation: gradientShine 1s ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    height: 1px;
  }
`}</style>;
