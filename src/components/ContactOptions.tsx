import React from "react";
import { Space } from "antd";
import { RightOutlined } from "@ant-design/icons";

const whatsappNumber = +40745109860;

const ContactOptions: React.FC = () => {
  const data = [
    {
      href: `https://wa.me/${whatsappNumber}`,
      iconBg: "#e7f5e9",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#25D366"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      label: "WhatsApp",
      sublabel: "Trimite-mi un mesaj",
    },
    {
      href: "https://instagram.com/stelas.crochet",
      iconBg: "#fce4ec",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E1306C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
      sublabel: "Vezi profilul meu",
    },
    {
      href: "https://facebook.com/profile.php?id=61559640265528",
      iconBg: "#e8f0fe",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1877F2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      label: "Facebook",
      sublabel: "Vezi profilul meu",
    },
  ];

  return (
    <Space orientation="vertical" size={10} className="w-full pt-2">
      {data.map(({ href, iconBg, icon, label, sublabel }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 px-4 py-3.5 rounded-lg border border-gray-200 bg-white no-underline hover:bg-gray-50! transition-colors"
        >
          <Space align="center" size={14} className="flex-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: iconBg }}
            >
              {icon}
            </div>
            <Space orientation="vertical" size={2}>
              <span className="text-sm font-medium text-[#1a1a1a]">
                {label}
              </span>
              <span className="text-xs text-[#888]">{sublabel}</span>
            </Space>
          </Space>
          <RightOutlined className="text-gray-400! text-xs ml-auto" />
        </a>
      ))}
    </Space>
  );
};

export default ContactOptions;
