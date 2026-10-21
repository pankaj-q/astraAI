import {
  Search,
  SquarePen,
  Coins,
  MessageCircle,
  MoreHorizontal,
  ChevronsLeft,
  Plus,
  Sparkles,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/getCoversations.js";
import {createConversation } from "../features/createConversation.js";
import {
  setConversation,
  addConversation,
  setSelectedConversation,
} from "../pages/redux/conversationSlice.js";


function SideArea() {
  const dispatch = useDispatch();
//   const [imageError, setImageError] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
   const { conversations, selectedConversation } = useSelector(
     (state) => state.conversations,
   );
  const {userData} = useSelector((state) => state.user);

  useEffect(() => {
    const getConv = async () => {
      try {
        const data = await getConversations();
        dispatch(setConversation(data));
       } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    };

    getConv();
  }, [userData?._id]);

  const handleConversatoin = async()=> {
     try {
         const data = await createConversation()
         dispatch(addConversation(data))
         dispatch(setSelectedConversation(data))
     } catch (error) {
        console.error("failed to create conversation", error)
     };
  }

  return (
    <aside
      className={`group/sidebar relative flex h-screen shrink-0 flex-col overflow-hidden border-r border-[#24272C] bg-[#090A0C] text-[#F5F5F5] transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[280px]"
      }`}
    >
      {/* =====================================================
          COLLAPSE BUTTON
      ====================================================== */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-3 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-[#25282D] bg-[#111316] text-[#8B8F96] transition-all duration-200 hover:border-[#3A3D42] hover:bg-[#191B1F] hover:text-white"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronsLeft
          size={18}
          className={`transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* =====================================================
          LOGO
      ====================================================== */}
      <div
        className={`flex h-[76px] shrink-0 items-center ${
          collapsed ? "justify-center px-0" : "px-5"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Astra Mark */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#30343A] bg-[#111316]">
            <span className="text-[19px] font-medium text-white">✦</span>
          </div>

          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-[18px] font-semibold tracking-[-0.02em]">
                Astra
              </h1>
              <p className="mt-0.5 text-[10px] tracking-[0.14em] text-[#666B73]">
                INTELLIGENT WORKSPACE
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          NEW CHAT + SEARCH
      ====================================================== */}
      <div className={`${collapsed ? "px-2" : "px-3"}`}>
        {/* New Chat */}
        <button
          className={`flex h-11 w-full items-center rounded-xl border border-[#30343A] bg-[#F4F4F4] text-[#090A0C] transition-all duration-200 hover:bg-[#E2E2E2] cursor-pointer ${
            collapsed ? "justify-center px-0" : "gap-3 px-3.5"
          }`}
          title="New chat"
          onClick={handleConversatoin}
        >
          <SquarePen size={17} strokeWidth={2} />

          {!collapsed && (
            <>
              <span className="text-[13px] font-semibold">New chat</span>

              <span className="ml-auto text-[11px] text-[#777]">⌘ N</span>
            </>
          )}
        </button>

        {/* Search */}
        <button
          className={`mt-2.5 flex h-10 w-full items-center rounded-xl border border-transparent text-[#858990] transition-all duration-200 hover:border-[#25282D] hover:bg-[#131518] hover:text-white ${
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          }`}
          title="Search chats"
        >
          <Search size={17} />

          {!collapsed && (
            <>
              <span className="text-[13px]">Search chats</span>

              <span className="ml-auto rounded-md border border-[#292C31] bg-[#15171A] px-1.5 py-0.5 text-[10px] text-[#676C73]">
                ⌘ K
              </span>
            </>
          )}
        </button>
      </div>

      {/* =====================================================
    CONVERSATIONS
===================================================== */}
      <div
        className={`mt-7 flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-3"}`}
      >
        {/* RECENT HEADER */}
        {!collapsed && (
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-[10px] font-semibold tracking-[0.16em] text-[#656A72]">
              RECENT
            </span>

            <button
              className="flex h-6 w-6 items-center justify-center rounded-md text-[#666B73] transition hover:bg-[#17191C] hover:text-white"
              title="New conversation"
              onClick={handleConversatoin}
            >
              <Plus size={14} />
            </button>
          </div>
        )}

        {/* CONVERSATION LIST */}
        <div className="space-y-1">
          {Array.isArray(conversations) && conversations.length > 0 ? (
            conversations.map((conversation) => {
              const conversationId = conversation._id || conversation.id;

              const isSelected =
                (selectedConversation?._id || selectedConversation?.id) ===
                conversationId;

              const title = conversation.title?.trim() || "New chat";

              return (
                <button
                  key={conversationId}
                  onClick={() =>
                    dispatch(setSelectedConversation(conversation))
                  }
                  title={title}
                  className={`group relative flex w-full items-center rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-[#3A3D42] bg-[#25282D] text-white"
                      : "border-transparent hover:border-[#292C31] hover:bg-[#15171A]"
                  } ${
                    collapsed
                      ? "h-11 justify-center px-0"
                      : "min-h-[58px] gap-3 px-3"
                  }`}
                >
                  {/* Selected indicator */}
                  {isSelected && !collapsed && (
                    <span className="absolute left-0 top-3 h-8 w-[2px] rounded-r-full bg-white" />
                  )}

                  {/* Icon */}
                  <MessageCircle
                    size={18}
                    strokeWidth={1.6}
                    className={`shrink-0 transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-[#676C73] group-hover:text-white"
                    }`}
                  />

                  {/* Title */}
                  {!collapsed && (
                    <>
                      <div className="min-w-0 flex-1 text-left">
                        <p
                          className={`truncate text-[13px] transition-colors ${
                            isSelected
                              ? "font-medium text-white"
                              : "text-[#A7ABB1] group-hover:text-white"
                          }`}
                        >
                          {title}
                        </p>
                      </div>

                      {/* More button */}
                      <MoreHorizontal
                        size={16}
                        className="shrink-0 text-[#62676E] opacity-0 transition group-hover:opacity-100 hover:text-white"
                      />
                    </>
                  )}
                </button>
              );
            })
          ) : (
            /* No conversations */
            <div className="px-2 py-6 text-center">
              <MessageCircle
                size={18}
                className="mx-auto mb-2 text-[#555A61]"
              />

              <p className="text-[12px] text-[#686D75]">New chat</p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          UPGRADE CARD
      ====================================================== */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <button className="group flex w-full items-center gap-3 rounded-xl border border-[#292C31] bg-[#101215] p-3.5 text-left transition-all duration-200 hover:border-[#3A3D42] hover:bg-[#17191C]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#34373C] bg-[#181A1D]">
              <Sparkles
                size={16}
                strokeWidth={1.7}
                className="text-[#D7D9DC]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-[#E7E8EA]">
                Upgrade to Pro
              </p>

              <p className="mt-0.5 text-[10px] leading-4 text-[#686D75]">
                More models and higher limits
              </p>
            </div>

            <ChevronRight
              size={16}
              className="text-[#666B72] transition-transform group-hover:translate-x-0.5 group-hover:text-white"
            />
          </button>
        </div>
      )}

      {/* =====================================================
          ACCOUNT
      ====================================================== */}
      {/* Account Section */}
      <div className={`border-t border-[#22252A] ${collapsed ? "p-2" : "p-3"}`}>
        <button
          className={`group flex w-full items-center rounded-xl transition-all duration-200 hover:bg-[#15171A] ${
            collapsed ? "justify-center p-2" : "gap-3 px-2.5 py-2.5"
          }`}
          title="Account settings"
        >
          {/* Avatar */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#34383E] bg-[#202329] text-[13px] font-medium text-white">
          {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt={userData?.name || "User"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";

                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            ) : (
              <span className="flex items-center justify-center">
                {(userData?.name || userData?.username || "User")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}

            {/* Fallback when image URL exists but image fails */}
            {userData?.avatar && (
              <span className="hidden items-center justify-center">
                {(userData?.name || userData?.username || "User")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}

            {/* Online */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#090A0C] bg-[#A8ADB5]" />
          </div>

          {!collapsed && (
            <>
              {/* User Details */}
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[13px] font-medium text-[#E8E9EB]">
                  {userData?.name || userData?.username || "User"}
                </p>

                <p className="mt-0.5 text-[10px] text-[#686D75]">Free plan</p>
              </div>

              {/* Coins */}
              <Coins size={10} className="cursor-pointer text-[#666B73] transition-all duration-200 group-hover:text-white" />

              {/* Logout */}
              <LogOut
                size={17}
                className="cursor-pointer text-[#666B73] transition-all duration-200 group-hover:rotate-45 group-hover:text-white"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  try {
                    await fetch("http://localhost:8000/api/auth/logout", {
                      method: "GET",
                      credentials: "include",
                    });

                    window.location.replace("/login");
                  } catch (error) {
                    console.error("Logout failed:", error);
                  }
                }}
              />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}


export default SideArea;
