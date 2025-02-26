/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';
import { FiChevronsLeft } from "react-icons/fi";
import { basicButton, emptyButton } from '../../../styles/buttons';
import { useRecoilState } from 'recoil';
import { mainSidebarIsOpenState } from '../../../atoms/mainSidebar/mainSidebarAtom';
import { LuLockKeyhole } from "react-icons/lu";
import { useUserMeQuery } from '../../../queries/userquery';
import { useNavigate } from 'react-router-dom';

function MainSidebar(props) {

    const navigate = useNavigate();

    const [ isOpen, setOpen ] = useRecoilState(mainSidebarIsOpenState);

    const loginUser = useUserMeQuery();

    const handleSidebarClose = () => {
        setOpen(false);
    }

    const hendleLoginButtonOnClick = () => {

        navigate("/");
    }

    const handleAccountOnClick = () => {

        navigate("/account/setting");
    }

    return (
        <div css={s.layout(isOpen)}>
            <div css={s.container}>
                <div css={s.groupLayout}>
                    <div css={s.topGroup}>
                        <div css={s.user}>
                            {
                                loginUser.isError
                                ?
                            <button css={emptyButton} onClick={hendleLoginButtonOnClick}>
                                <span css={s.authText}>
                                    <LuLockKeyhole />로그인 후 이용하기
                                </span>
                            </button>
                            :
                            <button css={emptyButton} onClick={handleAccountOnClick}>
                                <span css={s.authText}>
                                    <div css={s.profileImgBox}>
                                        {
                                            loginUser.isLoading ||
                                        <img src={`http://localhost:8080/image/user/${loginUser?.data?.data.profileImg}`} alt="" />
                                        }
                                    </div>
                                    <LuLockKeyhole />{loginUser.data?.data?.nickname}
                                </span>
                            </button>
                            }
                        </div>
                        <button css={basicButton} onClick={handleSidebarClose}><FiChevronsLeft /></button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MainSidebar;