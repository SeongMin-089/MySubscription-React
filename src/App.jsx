import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Summary from "./components/Summary";
import SubscriptionForm from "./components/SubscriptionForm";
import SearchFilter from "./components/SearchFilter";
import SubscriptionList from "./components/SubscriptionList";

const STORAGE_KEY = "subscriptions";

const initialForm = {
  name: "",
  category: "OTT",
  price: "",
  paymentDate: "",
  status: "사용중",
  memo: "",
};

function App() {
  const [subscriptions, setSubscriptions] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : [];
  });

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  }, [subscriptions]);

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "서비스명을 입력해주세요.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      return "월 구독료는 0보다 큰 숫자로 입력해주세요.";
    }

    if (!formData.paymentDate) {
      return "결제일을 선택해주세요.";
    }

    const isDuplicate = subscriptions.some((item) => {
      return (
        item.name.trim().toLowerCase() === formData.name.trim().toLowerCase() &&
        item.id !== editingId
      );
    });

    if (isDuplicate) {
      return "이미 등록된 구독 서비스입니다.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      setErrorMessage(error);
      return;
    }

    if (editingId) {
      setSubscriptions((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
                price: Number(formData.price),
              }
            : item
        )
      );
    } else {
      const newSubscription = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
      };

      setSubscriptions((prev) => [newSubscription, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (subscription) => {
    setEditingId(subscription.id);
    setFormData({
      name: subscription.name,
      category: subscription.category,
      price: subscription.price,
      paymentDate: subscription.paymentDate,
      status: subscription.status,
      memo: subscription.memo,
    });
    setErrorMessage("");
  };

  const handleDelete = (id) => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");

    if (!isConfirm) return;

    setSubscriptions((prev) => prev.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    if (searchText.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryFilter !== "전체") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (statusFilter !== "전체") {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (sortType === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortType === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortType === "paymentDate") {
      result.sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
    }

    return result;
  }, [subscriptions, searchText, categoryFilter, statusFilter, sortType]);

  const totalPrice = subscriptions
    .filter((item) => item.status !== "해지완료")
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <Header />

      <main className="container">
        <Summary
          totalCount={subscriptions.length}
          activeCount={subscriptions.filter((item) => item.status === "사용중").length}
          totalPrice={totalPrice}
        />

        <SubscriptionForm
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <SearchFilter
          searchText={searchText}
          setSearchText={setSearchText}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortType={sortType}
          setSortType={setSortType}
        />

        <SubscriptionList
          subscriptions={filteredSubscriptions}
          originalCount={subscriptions.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;