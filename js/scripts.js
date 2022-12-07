//Inputs
const billInput = document.getElementById("amount");
const tips = document.getElementsByName("tip");
const customTip = document.getElementById("tip-custom");
const peopleInput = document.getElementById("people");

//Outputs
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");

//Reset Button
const resetBtn = document.querySelector(".reset");

//Error Message
const errMsg = document.querySelector(".error-msg");

let tip, amt, ppl;
reset();

for (radio in tips) {
  tips[radio].onclick = function () {
    tip = Number(this.value);
    customTip.value = "";
    if (ppl >= 1) calc();
  };
}

customTip.addEventListener("input", () => {
  for (radio in tips) {
    if (tips[radio].checked)
      document.querySelector('input[name="tip"]:checked').checked = false;
  }

  tip = Number(customTip.value);
  if (ppl >= 1) calc();
});

billInput.addEventListener("input", () => {
  amt = Number(billInput.value);
  if (ppl >= 1) calc();
});

peopleInput.addEventListener("input", () => {
  ppl = Number(peopleInput.value);
  if (ppl < 1) {
    peopleInput.classList.add("error");
    errMsg.style.visibility = "visible";
  } else {
    peopleInput.classList.remove("error");
    errMsg.style.visibility = "hidden";
    calc();
  }
});

function calc() {
  resetBtn.disabled = false;
  resetBtn.classList.remove("gray");
  let totalTip = (tip * amt) / 100;
  let totalAmt = amt + totalTip;
  tipAmount.innerHTML = "$" + (totalTip / ppl).toFixed(2);
  totalAmount.innerHTML = "$" + (totalAmt / ppl).toFixed(2);
}

resetBtn.addEventListener("click", reset);
function reset() {
  tip = 15;
  amt = ppl = 0;
  document.getElementById("tip-15").checked = true;
  peopleInput.classList.remove("error");
  errMsg.style.visibility = "hidden";
  resetBtn.classList.add("gray");
  resetBtn.disabled = true;
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
}
