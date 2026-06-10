import SubscriptionItem from "./SubscriptionItem";

function SubscriptionList({ subscriptions, originalCount, onEdit, onDelete }) {
  if (originalCount === 0) {
    return (
      <section className="empty-box">
        <p>아직 등록된 구독 서비스가 없습니다.</p>
      </section>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <section className="empty-box">
        <p>검색 또는 필터 조건에 맞는 구독 서비스가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="list-section">
      {subscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription.id}
          subscription={subscription}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default SubscriptionList;