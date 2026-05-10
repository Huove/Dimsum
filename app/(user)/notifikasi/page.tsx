"use client";

import { useEffect, useState } from "react";

export default function UserNotificationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://dimsumwrap3d.berkahost.biz.id/api/notifications", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res.data || []))
      .catch((err) => console.error(err));
  }, [token]);

  const removeNotif = (id: number) => {
    setData((prev) => prev.filter((n) => n.id_notifikasi !== id));
  };

  const getStyle = (tipe: string) => {
    const t = tipe?.toLowerCase();

    switch (t) {
      case "success":
        return {
          bg: "bg-green-100",
          border: "border-green-500",
          text: "text-green-700",
          icon: "/succes.png",
        };

      case "error":
        return {
          bg: "bg-red-100",
          border: "border-red-500",
          text: "text-red-600",
          icon: "/error.png",
        };

      case "warning":
        return {
          bg: "bg-orange-100",
          border: "border-orange-400",
          text: "text-orange-600",
          icon: "/warning.png",
        };

      default:
        return {
          bg: "bg-blue-100",
          border: "border-blue-500",
          text: "text-blue-600",
          icon: "/info.png",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf3f2] p-3 sm:p-6">
      <div className="w-full mx-auto bg-[#FFFFFFBF] rounded-2xl sm:rounded-3xl p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

          <h1 className="text-xl sm:text-2xl font-bold text-[#741209]">
            Notifikasi
          </h1>

          <button
            onClick={() => setData([])}
            className="text-[#B54141] text-sm flex items-center gap-2 hover:opacity-70 transition"
          >
            <img
              src="/sampah.png"
              alt="hapus semua"
              className="w-5 h-5"
            />
            Hapus Semua
          </button>
        </div>

        {data.length === 0 && (
          <div className="bg-white text-black p-6 rounded-xl text-center shadow-sm">
            Belum ada notifikasi
          </div>
        )}

        <div className="space-y-4">
          {data.map((n) => {
            const style = getStyle(n.tipe);

            return (
              <div
                key={n.id_notifikasi}
                className={`${style.bg} border-t-4 ${style.border} rounded-2xl shadow-sm p-4 flex gap-3 justify-between items-start`}
              >

                <div className="flex gap-3 flex-1 min-w-0">

                  <img
                    src={style.icon}
                    alt="icon"
                    className="w-8 h-8 object-contain flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <p
                      className={`font-semibold ${style.text} text-sm sm:text-base break-words`}
                    >
                      {n.judul}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-700 break-words mt-1">
                      {n.pesan}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeNotif(n.id_notifikasi)}
                  className="
                    text-black
                    hover:text-red-500
                    transition
                    flex-shrink-0
                    text-lg
                  "
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}