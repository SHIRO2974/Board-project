import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/common/MainSidebar/MainSidebar';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import AccountPage from '../../pages/AccountPage/AccountPage';
import { useUserMeQuery } from '../../queries/userquery';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { useQueryClient } from '@tanstack/react-query';
import BoardWritePage from '../../pages/BoardWritePage/BoardWritePage';

function MainRoute(props) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"])

    useEffect(() => {

        if (queryState.status === "error") {   // 로그인이 되지 않았을 경우
            
            navigate("/auth/login");    // 로그인 화면으로 이동
        } 
    }, [queryState]);

    return queryState.status === "success" &&  // 로그인이 되었을 경우
            <>                  
                <MainSidebar />
                <MainContainer>
                    <Routes>
                        <Route path="/account/setting" element={<AccountPage />} />
                        <Route path='/board/write' element={<BoardWritePage />} /> 
                        <Route path="/*" element={<NotFoundPage />} />
                    </Routes>
                </MainContainer>
            </>
}

export default MainRoute;