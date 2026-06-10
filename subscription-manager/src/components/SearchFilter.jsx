const categories = ["전체", "OTT", "음악", "쇼핑", "클라우드", "기타"];
const statuses = ["전체", "사용중", "해지예정", "해지완료"];

function SearchFilter({
  searchText,
  setSearchText,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortType,
  setSortType,
}) {
  return (
    <section className="filter-section">
      <input
        type="text"
        placeholder="서비스명 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        {statuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>

      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="latest">최신순</option>
        <option value="priceHigh">가격 높은순</option>
        <option value="priceLow">가격 낮은순</option>
        <option value="paymentDate">결제일순</option>
      </select>
    </section>
  );
}

export default SearchFilter;