import React from 'react';
import MainLayout from "@/layouts/main-layout/main-layout.component";
import {useAppSelector} from "@/store/hooks/hook";

const Index = () => {
    const {pause} = useAppSelector((state) => state.player)
    console.log(pause)
  return (
      <>
          <MainLayout>
          <div className="center">
            <h1>Добро пожаловать!</h1>
            <h3>Здесь собраны лучшие треки!</h3>
          </div>
          </MainLayout>
        <style jsx>
          {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                `}
        </style>
      </>
  );
};

export default Index;