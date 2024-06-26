$(document).ready(function () {
  // Handle file input change
  $("#file").change(function () {
    var file = this.files[0];
    if (file) {
      var url = URL.createObjectURL(file);
      $("#image-circle").css("background-image", `url(${url})`);
      $("#displayImg").attr("src", url);
    }
  });

  // Handle aboutSelect change event
  $("#aboutSelect").change(function () {
    let selectedOption = $(this).val(); // Get the value of the selected option
    if (selectedOption === "onlineSearch") {
      // If selected option is "Online Search", show online search options and hide referral input
      $("#onlineSearchOptions").show();
      $("#referralFromTeamMember").hide();
    } else if (selectedOption === "referral") {
      // If selected option is "Referral", show referral input and hide online search options
      $("#onlineSearchOptions").hide();
      $("#referralFromTeamMember").show();
    } else if (selectedOption === "other") {
      // If selected option is other, enter detail textarea
      $("#otherDetails").show();
      $("#referralFromTeamMember").hide();
    } else {
      // If any other option is selected, hide both online search options and referral input
      $("#onlineSearchOptions").hide();
      $("#referralFromTeamMember").hide();
      $("#otherDetails").hide();
    }
  });

  // handle status of employment event
  $("#statusEmployment").change(function () {
    let employmentOption = $(this).val();
    if (employmentOption === "employed") {
      $("#employedNameInput").show();
    } else {
      $("#employedNameInput").hide();
    }
  });

  // Handle form submission
  $("#formApp").submit(function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Reset error messages
    $(".error").text("");

    // Validate inputs
    let isValid = true;

    // Name validation
    let name = $("#nameInput").val().trim();
    if (name === "") {
      displayError($("#nameError"), "Name is required.");
      isValid = false;
    }

    // Last name validation
    let lastName = $("#lastNameInput").val().trim();
    if (lastName === "") {
      displayError($("#lastNameError"), "Last name is required.");
      isValid = false;
    }

    // Country validation
    let country = $("#countrySelect").val();
    if (country === null || country === "Select your country") {
      displayError($("#countryError"), "Please select a country.");
      isValid = false;
    }

    // about validation
    let aboutUsValidation = $("#aboutSelect").val();
    if (
      aboutUsValidation === null ||
      aboutUsValidation === "Select one of the options"
    ) {
      displayError($("#aboutError"), "Please select one of the options above.");
      isValid = false;
    }

    // employment validations
    let employmentValidation = $("#statusEmployment").val();
    if (
      employmentValidation === null ||
      employmentValidation === "Select your status of work"
    ) {
      displayError(
        $("#employmentError"),
        "Please select your status of employment."
      );
      isValid = false;
    }

    // D.O.B validations
    let dobValidation = $("#dateInput").val();

    if (dobValidation === "") {
      displayError($("#dobError"), "Please enter your date of birth.");
      isValid = false;
    } else {
      // Calculate the date 18 years ago from today
      let eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

      // Convert the input date to a Date object
      let selectedDate = new Date(dobValidation);

      // Compare the selected date with 18 years ago
      if (selectedDate > eighteenYearsAgo) {
        displayError($("#dobError"), "Cannot be under 18.");
        isValid = false;
      }

      // if all items are valid, proceed with validation
      if (isValid) {
        // Clear any previous error messages
        $(".error").text("");

        // Display the submitted values in the display box
        $("#dobValue").text(dobValidation);
        $("#employmentValue").text($("#statusEmployment").val());
        $("#socialMediaValue").text(
          $("input[name='onlineSearchOption']:checked").val()
        );

        // Get the background image URL of the #image-circle element
        let imageUrl = $("#image-circle")
          .css("background-image") // Get the background-image CSS property
          .replace('url("', "") // Remove the 'url("' prefix
          .replace('")', ""); // Remove the '")' suffix

        // Set the extracted image URL as the src attribute of the #displayImage element
        $("#displayImage").attr("src", imageUrl);

        // Show the display box
        $("#displayBox").show();
      }
    }
  });

  // Function to display error message
  function displayError(element, message) {
    // Set the text content of the element to the provided error message
    element
      .text(message)
      // Apply styles to the error message
      .css({
        color: "red", // Set text color to red
        "font-weight": "bold", // Set font weight to bold
      });
  }
});
