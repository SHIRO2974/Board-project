/**@jsxImportSource @emotion/react */
import ReactModal from 'react-modal';
import { api } from '../../configs/axiosConfig';
import { useUpdateNicknameMutation, useUpdateProfileImgMutation } from '../../mutations/accountMutation';
import { useUserMeQuery } from '../../queries/userquery';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import PasswordModal from '../../components/auth/PasswordModal/PasswordModal';

function AccountPage(props) {
    const loginUser = useUserMeQuery();
    const updateProfileImgMutation = useUpdateProfileImgMutation();
    const updateNicknameMutation = useUpdateNicknameMutation();

    const [ emailModalOpen, setEmailModalOpen ] = useState(false);
    const [ passwordModalOpen, setPasswordModalOpen ] = useState(false);
    const [ nicknameValue, setNickNameValue ] = useState("");

    useEffect(() => {
        setNickNameValue(loginUser?.data?.data.nickname || "");
    }, [loginUser.isFetched]);


    const handleProfileImgFileOnChange = async (e) => {
        console.log({element: e.target});
        const fileList = e.target.files;
        const file = fileList[0];

        const formData = new FormData();
        formData.append("file", file);
        
        updateProfileImgMutation.mutateAsync(formData);
        loginUser.refetch();
    }

    const handleNicknameInputOnChange = (e) => {

        setNickNameValue(e.target.value);
    } 

    const handleSaveNickNameButtonOnCilck = async () => {

        await updateNicknameMutation.mutateAsync(nicknameValue);
        loginUser.refetch();
    }

    const handleChangePasswordButtonOnClick = () => {

        setPasswordModalOpen(true);
    }

    const handleChangeEmailButtonOnClick = () => {

        setEmailModalOpen(true);
    }

    return (
        <div css={s.container}>
            <h2 css={s.title}>Account</h2>
            <div css={s.accountBox}>
                <label css={s.profileImgBox}>
                    <img src={`http://localhost:8080/image/user/${loginUser?.data?.data.profileImg || "images.png"}`} alt="" />
                    <input type="file" onChange={handleProfileImgFileOnChange} />
                </label>
                <div>
                    <h3 css={s.nicknameTitle}>Preferred nickname</h3>
                    <div>
                        <input css={s.textInput} type="text" value={nicknameValue} onChange={handleNicknameInputOnChange}/>
                    </div>
                    <button css={s.saveButton} onClick={handleSaveNickNameButtonOnCilck} disabled={loginUser.data.data.nickname === nicknameValue}>save nickname</button>
                </div>
            </div>
            
            <h2 css={s.title}>Account security</h2>
            <div>
                <div css={s.itemGroup}>
                    <div>
                        <h3 css={s.subTitle}>Email</h3>
                        <p css={s.subContent}>{loginUser?.data?.data.email}</p>
                    </div>
                    <button css={s.borderButton} onClick={handleChangeEmailButtonOnClick}>Change email</button>
                </div>
                {
                    !!loginUser?.data?.data.oauth2Name || 
                <div css={s.itemGroup}>
                    <div>
                        <h3 css={s.subTitle}>password</h3>
                        <p css={s.subContent}>계정에 로그인할 영구 비밀번호를 설정합니다.</p>
                    </div>
                    <button css={s.borderButton} onClick={handleChangePasswordButtonOnClick}>Change password</button>
                </div>
                }
            </div>

            <ReactModal 
                isOpen={emailModalOpen}
                onRequestClose={() => setEmailModalOpen(false)}
                style={{
                    overlay: {
                        
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000066",
                    },
                    content: {

                        position: "static",
                        boxSizing: "border-box",
                        borderRadius: "1.5rem",
                        width: "37rem",
                    }
                }}
                children={<emailModalOpen setOpen={setEmailModalOpen} />}
            />

            <ReactModal 
                isOpen={passwordModalOpen}
                onRequestClose={() => setPasswordModalOpen(false)}
                style={{
                    overlay: {
                        
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000066",
                    },
                    content: {

                        position: "static",
                        boxSizing: "border-box",
                        borderRadius: "1.5rem",
                        width: "37rem",
                    }
                }}
                children={<PasswordModal setOpen={setPasswordModalOpen} />}
            />
           
        </div>
    );
}

export default AccountPage;