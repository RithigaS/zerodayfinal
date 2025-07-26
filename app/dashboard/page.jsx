"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./dashboard.module.css";
import { title } from "process";

const features = [
  {
    title: "Announcements Feed",
    description: "View and filter announcements by category and date",
    path: "/announcements",
  },
  {
    title: "Lost & Found",
    description: "Report and search lost/found items with images and filters",
    path: "/lostfound",
  },
  {
    title: "Weekly Timetable",
    description: "Add, edit, delete classes shown in a grid view",
    path: "/timetable",
  },
  {
    title: "Hostel Complaints",
    description: "Submit complaints and track status updates",
    path: "/complaints",
  },
  {
    title: "Tech News And Opportunities",
    description: "Submit complaints and track status updates",
    path: "/feed",
  },
];

const adminFeatures = [
  {
    title: "Manage Users",
    description: "View and manage registered users",
    path: "/admin/users",
  },
  {
    title: "Post Announcements",
    description: "Create campus-wide announcements",
    path: "/announcements/add",
  },
  {
    title: "Tech News And Oppourtunities",
    description: "Posting Feeds Related to Technology and hackathon",
    path: "/feed/add",
  },
];

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const userRole = session?.user?.role; // Must be set during login

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        CampusLink - Centralized Student Utility Hub
      </h1>

      <div className={styles.grid}>
        {features.map((feature) => (
          <div
            key={feature.title}
            className={styles.card}
            onClick={() => router.push(feature.path)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(feature.path);
              }
            }}
          >
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}

        {userRole === "admin" && (
          <h1
            className={styles.title}
            style={{
              display: "inline-block",
            }}
          >
            Admin Features
          </h1>
        )}

        {userRole === "admin" &&
          adminFeatures.map((feature) => (
            <>
              <div
                key={feature.title}
                className={styles.card}
                onClick={() => router.push(feature.path)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(feature.path);
                  }
                }}
              >
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </>
          ))}
      </div>
    </main>
  );
}
