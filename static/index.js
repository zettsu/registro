let current_index = 0;

document.getElementById("form-login").addEventListener('submit', function (evt) {
    evt.preventDefault();
    let first_step = document.getElementById("first-step");
    let second_step = document.getElementById("second-step");
    if (!first_step.classList.contains("hide")) {
        document.getElementById("first-step").classList.add('hide');
    }
    if (second_step.classList.contains("hide")) {
        document.getElementById("second-step").classList.remove('hide');
    }
})


document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", async function (evt) {
        if (current_index < 4) {

            document.getElementById("password-" + current_index).value = this.value;
            if (!document.getElementById("password-" + current_index).classList.contains("orange")) {
                document.getElementById("password-" + current_index).classList.add("orange");
            }

            if (current_index == 3) {
                let usuario = document.getElementById("usuario").value;
                let pass = document.getElementById("password-0").value + document.getElementById("password-1").value + document.getElementById("password-2").value + document.getElementById("password-3").value;
                let result = await register(usuario, `${pass}`) 
                if(result){
                    let first_step = document.getElementById("first-step");
                    let second_step = document.getElementById("second-step");
                    let title = document.getElementById("title");
                    let success = document.getElementById("success");

                    if (success.classList.contains("hide")) {
                        success.classList.remove('hide');
                    }
                    if (!title.classList.contains("hide")) {
                        title.classList.add('hide');
                    }
                    if (!first_step.classList.contains("hide")) {
                        first_step.classList.add('hide');
                    }
                    if (!second_step.classList.contains("hide")) {
                        second_step.classList.add('hide');
                    }
                }else{
                    current_index = 0;
                }
            }
            current_index++;
        }
    });
});



document.getElementById("borrar").addEventListener('click', function () {
    for (let index = 0; index < 4; index++) {
        document.getElementById("password-" + index).classList.remove("orange")
        document.getElementById("password-" + index).value = "";
    }

    document.getElementById("password-0").focus();
    current_index=0
})
