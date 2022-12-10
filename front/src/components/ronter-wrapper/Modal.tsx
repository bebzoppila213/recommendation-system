import RegisterForm from "../forms/RegisterForm"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { closeModal } from "../../state/modalSlice" 
import AuthForm from "../forms/AuthForm"


export default function Modal(){
    const modal = useAppSelector(state =>  state.modal)
    const dispatcher = useAppDispatch()

    const renderModalContent = () => {
        switch(modal.modalContent){
            case "register":
                return <RegisterForm></RegisterForm>
        
            case "auth":
                return <AuthForm></AuthForm>
            }
    }

    return(
        <div onClick={() => dispatcher(closeModal())} className={"modal " + (!modal.isOpen ? " modal--close" : " ")}>
            <div onClick={event => event.stopPropagation()} className="modal__inner">
                
                {
                    renderModalContent()
                }
            </div>
        </div>
    )
}