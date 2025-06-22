import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../ThemeContext"; // عدل حسب مسارك
import { useTranslation } from "react-i18next";

const statusTranslation = {
  pending: { ar: "قيد الانتظار", en: "Pending" },
  confirmed: { ar: "تم التأكيد", en: "Confirmed" },
  delivered: { ar: "تم التوصيل", en: "Delivered" },
  canceled: { ar: "ملغى", en: "Canceled" },
};

export default function MyOrders() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة لتغيير اللغة بالعكس
  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  // استرجاع userId من التوكن
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) return null;
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload);
      const decoded = JSON.parse(payload);
      return decoded.userId || decoded.id || decoded._id;
    } catch (err) {
      console.error("خطأ في فك التوكن:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError(t("user_not_known"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://my-backend-dgp2.onrender.com/api/orders/${userId}`
        );
        setOrders(response.data);
      } catch (err) {
        setError(t("fetch_orders_error"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [t]);

  if (loading)
    return (
      <div
        className="p-6 text-center text-gray-500 dark:text-gray-400"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        {t("loading_orders")}
      </div>
    );

  if (error)
    return (
      <div
        className="p-6 text-center text-red-600 font-semibold"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        {error}
      </div>
    );

  return (
    <div
      className={`p-4 sm:p-6 max-w-5xl mx-auto transition-colors duration-500 bg-gray-50 dark:bg-gray-900 min-h-screen ${
        i18n.language === "ar" ? "text-right" : "text-left"
      }`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800 dark:text-gray-100">
        🧾 {t("my_orders")}
      </h2>

      {/* أزرار التبديل */}
      <div className="flex justify-end mb-6 space-x-2 space-x-reverse">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-md bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-300 transition-colors duration-300 hover:bg-blue-300 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t("toggle_language")}
          title={t("toggle_language")}
        >
          {i18n.language === "ar" ? "English" : "العربية"}
        </button>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={t("toggle_dark_mode")}
          title={t("toggle_dark_mode")}
        >
          {darkMode ? t("light_mode") + " ☀️" : t("dark_mode") + " 🌙"}
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          {t("no_orders_yet")}
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 bg-white dark:bg-gray-800"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">
                  {t("order_number")}: <span className="font-normal">{order._id}</span>
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      order.status === "pending"
                        ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300"
                        : order.status === "confirmed"
                        ? "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-300"
                        : order.status === "delivered"
                        ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-300"
                        : order.status === "canceled"
                        ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-300"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {(statusTranslation[order.status] && statusTranslation[order.status][i18n.language]) || order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="text-sm font-medium">{t("total")}:</p>
                  <p className="text-lg font-bold">{order.total.toFixed(2)} ر.س</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t("date")}:</p>
                  <p>
                    {new Date(order.createdAt).toLocaleDateString(
                      i18n.language === "ar" ? "ar-EG" : "en-US"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t("product_count")}:</p>
                  <p>{order.products.length}</p>
                </div>
              </div>

              <details className="text-gray-700 dark:text-gray-300">
                <summary className="cursor-pointer font-semibold mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  {t("show_products_details")} ▼
                </summary>
                <ul className="list-disc list-inside space-y-1 max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
                  {order.products.map((product, index) => (
                    <li key={index} className="text-sm break-words">
                      {product.name} — {product.quantity} × {product.price.toFixed(2)} ر.س
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
