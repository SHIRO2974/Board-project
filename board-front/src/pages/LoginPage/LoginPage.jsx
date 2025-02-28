/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useLoginMutation, useSendAuthMailMutation } from '../../mutations/authMutation';
import Swal from 'sweetalert2';
import { setTokenLocalStorage } from '../../configs/axiosConfig';
import { useUserMeQuery } from '../../queries/userquery';
import { useQueryClient } from '@tanstack/react-query';

function LoginPage(props) {

    const navigete = useNavigate();
    const queryClient = useQueryClient();
    const loginMutation = useLoginMutation();
    const sendAuthMailMutation = useSendAuthMailMutation();

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ inputValue, setInputValue] = useState({

        username: searchParams.get("username") || "",
        password: ""
    })

    const handleInputOnchange = (e) => {

        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleLoginOnClick = async () => {

        try {
            
            const response = await loginMutation.mutateAsync(inputValue)
            const tokenName = response.data.name;
            const accessToken = response.data.token;
            setTokenLocalStorage(tokenName, accessToken);
            await Swal.fire({
                icon: "success",
                text: "로그인 성공",
                timer: 1000,
                position:"center",
                showCancelButton: false,
            });
            await queryClient.invalidateQueries({queryKey: ["userMeQuery"]});   // 캐쉬를 신선하지 않은 상태로 바꾼다

            navigete("/");

        } catch (error) {

            if(error.response.status === 401) {

                const result = await Swal.fire({

                    title: '계정 활성화!',
                    text: '계정을 활성화 하려면 등록하신 메일을 통해 계정 인증을 하세요. 다시 메일 재전송이 필요하면 전송버튼을 클릭하세요.',
                    icon: 'error',
                    confirmButtonText: '전송',
                    confirmButtonAriaLabel: "#2389e2",
                    showCancelButton: true,
                    cancelButtonText: '취소',
                    confirmButtonAriaLabel: "#999999",
                });                
                if(result.isConfirmed) {

                    await sendAuthMailMutation.mutateAsync(inputValue.username);
                    await Swal.fire({
                        title: '메일 전송 완료',
                        confirmButtonText: '확인',
                        confirmButtonAriaLabel: "#2389e2",

                    })
                }

            } else {

            //  sweetalert2 사용
            await Swal.fire({

                title: '로그인 실패!',
                text: '사용자 정보를 다시 확인해주세요',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonAriaLabel: "#e22323"
              });
            
            }
        
        }

    return (
        <div css={s.layout}>
            <div>
                <header>
                    <h1 css={s.title1}>Think it. Make it.</h1>
                    <h1 css={s.title2}>Log in to your Board account</h1>
                </header>
                <main>
                    <div css={s.oauth2Group}>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiGoogle /></div>
                                <span css={s.oauth2Text}>Continue with Google</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiNaver /></div>
                                <span css={s.oauth2Text}>Continue with Naver</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiKakao /></div>
                                <span css={s.oauth2Text}>Continue with Kakao</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div css={s.groupBox}>
                            <input css={s.textInput} type="text" placeholder="Enter your username..." 
                                name="username"
                                value={inputValue.username}
                                onChange={handleInputOnchange}
                            />
                        </div>
                        <div css={s.groupBox}>
                            <input css={s.textInput} type="password" placeholder='password...' 
                                name="password"
                                value={inputValue.password}
                                onChange={handleInputOnchange}
                            />
                        </div>
                        <p css={s.accountMessage}>
                            계정이 없으시다면 지금 가입하세요. <Link to={"/auth/join"}>회원가입</Link>
                        </p>
                        <div css={s.groupBox}>
                            <button css={s.accountButton} onClick={handleLoginOnClick}>Login</button>
                        </div>
                    </div>
                </main>
                <footer>
                    <p css={s.footerAgreement}>
                        이메일을 사용하여 계정을 구분하고 다른 사용자들에게 게시글을 공유합니다.
                        계속 진행하려면 약관 및 개인정보 보호정책을 이해하고 동의한다는 것을 인정해야합니다.
                    </p>
                </footer>
            </div>
        </div>
        );
    } 
}
export default LoginPage;