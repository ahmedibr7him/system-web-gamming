import { useState, useEffect } from "react";
import Title from "../../component/Title";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUsers,deleteusers,updateUserRole,} from "../Redux/UsersSlic";
import { showToast } from "../../Redux/toast/Toast";

const Users = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  
  const { users = [], loading } = useSelector((state) => state.users || {});

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteusers(id));
    }
  };

  const toggleAdmin = (user) => {
    dispatch(
      updateUserRole({
        id: user.id,
        role: user.role === "admin" ? "user" : "admin",
      })
    );
    user.role === "admin"?dispatch(showToast({message:"The admin has been removed.",type:"success"})) :dispatch(showToast({message:"He was appointed as an admin",type:"success"}))
  };

  return (
    <div className={`max-w-7xl mx-auto pb-20 px-4 ${isArabic ? "font-cairo" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      
      <Title 
        title={t("Users Management")} 
        subTitle={`${users.length} ${t("users registered in the system")}`} 
      />

      <div className="bg-white rounded-4xl shadow-xl shadow-gray-100/50 mt-8 overflow-hidden border border-gray-50">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/80 text-secondary uppercase text-[11px] font-bold tracking-widest text-start">
                <th className="p-6 border-b">{t("User")}</th>
                <th className="p-6 border-b">{t("Email")}</th>
                <th className="p-3 border-b text-center">{t("Role")}</th>
                <th className="p-6 border-b text-center">{t("Actions")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {users.map((user, index) => (
                <tr key={user.id} className="group transition-all hover:bg-primary/2">
                  {/* user name */}
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase shadow-sm border border-primary/5">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <span className="font-bold text-gray-800">{user.name}</span>
                    </div>
                  </td>

                  {/* email */}
                  <td className="p-6 text-secondary italic text-xs font-medium">
                    {user.email}
                  </td>

                 {/* role */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border tracking-tight
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 border-purple-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {t(user.role)}
                    </span>
                  </td>

                  {/* button change role */}
                  <td className="p-6">
                    <div className="flex gap-2 justify-center items-center">
                      
                      {/* Admin */}
                      {index > 0 ? (
                        <>
                          <button aria-label="admin" onClick={() => toggleAdmin(user)} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all active:scale-95 shadow-sm flex items-center gap-2 ${user.role === "admin"   ? "bg-amber-500 text-white hover:bg-amber-600"  : "bg-primary text-white hover:bg-primary/90"}`}>
                            <i className={`fa-solid ${user.role === "admin" ? "fa-user-minus" : "fa-user-shield"}`}></i>
                            {user.role === "admin" ? t("Revoke Admin") : t("Make Admin")}
                          </button>

                          <button
                          aria-label="delete"
                            onClick={() => handleDelete(user.id)}
                            className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-100"
                            title={t("Delete User")}
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </>
                      ) : (
                        // all user
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl">
                           <i className="fa-solid fa-crown text-amber-500 text-xs"></i>
                           <span className="text-[10px] font-black text-secondary uppercase tracking-widest">
                             {t("Super Admin")}
                           </span>
                        </div>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;