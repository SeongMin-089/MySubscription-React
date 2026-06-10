const categories = ["OTT", "음악", "쇼핑", "클라우드", "기타"];
const statuses = ["사용중", "해지예정", "해지완료"];

function SubscriptionForm({
  formData,
  setFormData,
  editingId,
  errorMessage,
  onSubmit,
  onCancel,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="form-section">
      <h2>{editingId ? "구독 정보 수정" : "구독 서비스 등록"}</h2>

      <form onSubmit={onSubmit} className="subscription-form">
        <input
          type="text"
          name="name"
          placeholder="서비스명"
          value={formData.name}
          onChange={handleChange}
        />

        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="월 구독료"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <textarea
          name="memo"
          placeholder="메모"
          value={formData.memo}
          onChange={handleChange}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-buttons">
          <button type="submit">{editingId ? "수정하기" : "등록하기"}</button>

          {editingId && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              취소
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default SubscriptionForm;