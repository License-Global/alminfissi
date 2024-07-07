'use client'
import OrdersList from "@/components/tables/OrdersList";
import { isAuthenticated } from "@/utils/Auth/Auth";
import { useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState("");

  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login")
    } else {
      axios.get(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/users/${isAuth?.userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(function (response) {
          if (response.status === 200) {
            setIsLoading(false);
            setUserType(response?.data.user.role);
          } else {
            redirect("/login")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [])

  if (isLoading) {
    return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
  } else {
    return (<div className="flex justify-center flex-col"><OrdersList /></div>)
  };
}
