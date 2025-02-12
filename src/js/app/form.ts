import axios from "axios";
import {Fancybox} from "@fancyapps/ui";

enum ModalStatus {
    ACCEPTED = "ACCEPTED",
    ERROR = "ERROR",
}

class Form {
    form;
    url;
    sendBtn
    inputs;
    accept;
    successModal;
    errorModal;
    error;
    
    constructor(form: Element) {
        this.form = form;
        this.url = this.form.getAttribute('action');
        this.sendBtn = this.form.querySelector('button[type="submit"]');
        this.accept = this.form.querySelectorAll('[data-accept-form]');
        this.inputs = [...Array.from(this.form.querySelectorAll('input')), ...Array.from(this.form.querySelectorAll('textarea'))];
        this.successModal = document.querySelector('#modal-accept')
        this.errorModal = document.querySelector('#modal-error')
        this.error = false;
        
        this.init()
    }
    
    init() {
        this.changeButtonVisible()
        
        this.accept.forEach(accept => {
            accept.addEventListener('change', () => {
                this.changeButtonVisible()
            })
        })
        
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            
            // @ts-ignore
            grecaptcha.ready(() => {
                // @ts-ignore
                grecaptcha.execute('6LcBKdUqAAAAANFHfh5Zkg-ExdT7OHwzlKZqq0P_', {action: 'submit'}).then(() => {
                    this.sendData();
                });
            });
        })
    }
    
    getData = () => {
        const data = new FormData();
        const errors: (HTMLInputElement | HTMLTextAreaElement)[] = [];
        
        this.inputs.forEach((input) => {
            data.append(input.name, input.value);
            input.classList.remove('error')
            const isRequired = input.hasAttribute('required');
            
            if (isRequired && input.inputmask) {
                if (input.value.length > 1 && !input.inputmask.isComplete()) {
                    input.classList.add('error');
                    this.error = true;
                    errors.push(input);
                } else {
                    this.error = false;
                }
            }
            
            if (isRequired && input.value.length <= 2) {
                input.classList.add('error');
                this.error = true;
                errors.push(input);
            }
            
            if (!isRequired && input.type !== 'checkbox') {
                if (input.value.length > 0 && input.value.length <= 2) {
                    input.classList.add('error');
                    errors.push(input);
                    this.error = true;
                } else if (input.value.length === 0) {
                    errors.push(input);
                }
            }
        })
        
        if (errors.length > 0) {
            return 'error';
        } else {
            return data;
        }
    }
    
    sendData = () => {
        if (this.getData() !== 'error') {
            axios.post(this.url, this.getData())
                .then(response => response.data)
                .then(data => {
                    this.showModal(ModalStatus.ACCEPTED);
                    console.log(data);
                    this.inputs.forEach((input) => {
                        input.value = '';
                    })
                })
                .catch(error => {
                    this.showModal(ModalStatus.ERROR, error.message);
                    console.log(error)
                });
        }
    }
    
    changeButtonVisible = () => {
        if (this.accept) {
            const accepted = Array.from(this.accept).filter((accept: HTMLInputElement) => {
                return accept.checked;
            })
            
            if (this.sendBtn) {
                accepted.length >= 2
                    ? this.sendBtn.removeAttribute('disabled')
                    : this.sendBtn.setAttribute('disabled', '')
            }
        }
    }
    
    showModal = (status: ModalStatus, message?: string) => {
        if (status === ModalStatus.ACCEPTED) {
            Fancybox.show([this.successModal])
        } else {
            const text = this.errorModal.querySelector('p');
            // text.textContent = message;
            Fancybox.show([this.errorModal])
        }
        
        setTimeout(() => {
            Fancybox.close()
        }, 2000)
    }
}

export default Form;
