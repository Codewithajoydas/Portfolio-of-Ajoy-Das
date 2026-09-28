let btn = document.getElementById("btn");
let result = document.getElementById("result");
result.innerHTML = "Result will be shown here";
btn.addEventListener("click", () => {
  let inp = document.getElementById("inp");
  let word = inp.value;
  let reversed = word.split("").reverse().join("");

  if (word === reversed) {
    result.innerHTML = `The ${word} is a palindrome`;
  } else {
    result.innerHTML = `The ${word} is Not a palindrome`;
  }
});

