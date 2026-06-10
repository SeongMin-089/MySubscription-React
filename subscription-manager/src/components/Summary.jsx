function Summary({ totalCount, activeCount, totalPrice }) {
  return (
    <section className="summary">
      <div className="summary-card">
        <span>전체 구독</span>
        <strong>{totalCount}개</strong>
      </div>

      <div className="summary-card">
        <span>사용중</span>
        <strong>{activeCount}개</strong>
      </div>

      <div className="summary-card highlight">
        <span>월 구독료 합계</span>
        <strong>{totalPrice.toLocaleString()}원</strong>
      </div>
    </section>
  );
}

export default Summary;