/**@jsxImportSource @emotion/react */
import Quill from 'quill';
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import "quill/quill."

function BoardWritePage(props) {

    const containerRef = useRef();
    const [ quillContent, setQuillContent]=useState();
    useEffect(() => {
        
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }, 'bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
          
          ];
          

          const quill = new Quill(containerRef.current, {
            modules: {
              toolbar: toolbarOptions
            },
            theme: 'snow',
            
        });

        quill.on('text-change', () => {
            setQuillContent(quill.root.innerHTML);
        });

            quill.root.style
        }, []);

    return (
        <div css={s.quillEditor} ref={containerRef}>
            <div ref={containerRef}></div>
        </div>
    );
}
export default BoardWritePage;