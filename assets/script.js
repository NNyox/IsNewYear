    //#region particles
    particlesJS.load('particles-js', 'jsons/config.json', function() {
      console.log('Config 1 cargado');
      document.getElementById("particles-js").style.display = "none"
    });
    particlesJS.load('particles-js2', 'jsons/config2.json', function() {
      console.log('Config 2 cargado');
    });
    //#endregion

    //#region verify text
    function verifyText() {
      // if the windows width is greater than windows height
      if (window.innerWidth > window.innerHeight) {
        // the text takes 10% of the height
        document.getElementById("remaining").style.fontSize = "10vh";
      // if the windows height is greater than windows width
      } else {
        // the text takes 10% of the width
        document.getElementById("remaining").style.fontSize = "10vw";
      };
    };

    // when the windows is resized, execute
    window.addEventListener("resize", () => {
      verifyText();
    });

    // execute at starts the website
    verifyText();
    //#endregion

    //#region calculate newYear
    // i defined newYear
    var newYear;
    // function to calculate newYear
    function getNewYear() {
      // get the current year
      var now = new Date();
      // get the first moment of the new year
      newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    };
    // initialize the new year
    getNewYear();
    //#endregion

    // #region calculate remains
    // get all remains in the document
    var remains = document.querySelectorAll(".remainTime");
    // function to calculate the remains
    function updateCountdown() {
      // get the current date
      var now = new Date();
      // get time diff
      var timeDiff = newYear - now;

      // if time is positive, calculates the time diff in days, hours, minutes and seconds
      if (timeDiff > 0) {
        // get the days, hours, minutes and seconds
        var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
        var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000).toString().padStart(2, "0");
        // update the remains
        for (let i = 0; i < remains.length; i++) {
          // if 0, rewrite days; if 1, rewrite hours; if 2, rewrite minutes; if 3, rewrite seconds
          let selectedObj = i === 0 ? days : i === 1 ? hours : i === 2 ? minutes : seconds;

          // if the remain text content is diferent
          if (remains[i].textContent !== selectedObj) {
            // i add the class animated
            remains[i].classList.add("animated");
            setTimeout(function() {
              // at the middle of the animation i change the remain text content
              remains[i].textContent = selectedObj;
            }, 200);
            setTimeout(function() {
              // when the animations is ended, i remove the class animated
              remains[i].classList.remove("animated");
            }, 400);
          }
        }
      // if time is less than 1 day, recalculate the new year
      } else if (timeDiff <= -(1000 * 60 * 60 * 24)) {
        getNewYear();
      // else, congratulations!
      } else {
        document.getElementById("remaining").textContent = "¡Feliz Año Nuevo!";
        document.getElementById("remaining").classList.add("animated2")
        document.getElementById("particles-js2").style.display = "none";
        document.getElementById("particles-js").style.display = "block";
      };
    };
    setInterval(updateCountdown, 100);
    //#endregion