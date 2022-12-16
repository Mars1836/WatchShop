import React, { forwardRef } from 'react';
export function ChildModal(){ forwardRef((props, ref)=>{
    return (
        <div className="modal" ref={ref}>
           <p>This is an info modal</p>
           <button type="button" onClick={() => toggleModal()}>
              Close modal
            <button/>
       </div>
    )
});}