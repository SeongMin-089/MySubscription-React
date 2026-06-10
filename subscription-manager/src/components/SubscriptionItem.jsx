function SubscriptionItem({ subscription, onEdit, onDelete }) {
  const statusClass = {
    사용중: "active",
    해지예정: "pending",
    해지완료: "cancelled",
  };

  return (
    <article className="subscription-card">
      <div className="card-top">
        <div>
          <h3>{subscription.name}</h3>
          <span className="category">{subscription.category}</span>
        </div>

        <span className={`status ${statusClass[subscription.status]}`}>
          {subscription.status}
        </span>
      </div>

      <div className="card-info">
        <p>
          <strong>월 구독료</strong>
          <span>{subscription.price.toLocaleString()}원</span>
        </p>

        <p>
          <strong>결제일</strong>
          <span>{subscription.paymentDate}</span>
        </p>

        {subscription.memo && (
          <p>
            <strong>메모</strong>
            <span>{subscription.memo}</span>
          </p>
        )}
      </div>

      <div className="card-buttons">
        <button onClick={() => onEdit(subscription)}>수정</button>
        <button className="delete-button" onClick={() => onDelete(subscription.id)}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default SubscriptionItem;