import Swal from "sweetalert2";



export function errorMessage(message: string) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
}


export function warningMessage(message: string,title?: string) {
    Swal.fire({
        icon: "warning",
        title: title ? title : "Oops...",
        text: message,
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
}


export function successMessage(message: string,title?: string) {
    Swal.fire({
        icon: "success",
        title: title ? title : "Супер!",
        text: message,
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
}