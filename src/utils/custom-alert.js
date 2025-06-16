import Swal from "sweetalert2";

const SwalSuccess = Swal.mixin({
  background: "white",
  icon: "success",
  timer: 3000,
  buttons: {
    confirm: "Okay",
  },
});

const SwalError = Swal.mixin({
  background: "white",
  icon: "error",
  timer: 3000,
  buttons: {
    confirm: "Okay",
  },
});

const SwalWarning = Swal.mixin({
  background: "white",
  icon: "warning",
  timer: 3000,
  buttons: {
    confirm: "Okay",
  },
});
// const showConfirmation = (func, text, title) => {
//   Swal.fire({
//     title: title || "Are you sure?",
//     text: text || "You will not be able to undo this action!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes",
//     cancelButtonText: "Cancel",
//     background: "white",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // handleYesClick(argument);
//       func;
//     }
//   });
// };

// const showConfirmation = () => {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You will not be able to undo this action!',
//     icon: 'warning',
//     showCancelButton: true, 
//     confirmButtonText: 'Yes',
//     cancelButtonText: 'Cancel',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       handleYesClick();
//     }
//   });
// };

export { SwalError, SwalSuccess, SwalWarning };

// CustomSwal.fire({
//     timer: 3000,
//     buttons: {
//       confirm: "Okay"
//     },
//   })
