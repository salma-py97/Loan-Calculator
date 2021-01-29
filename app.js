// Listen for Submit

document.getElementById("loan-form").addEventListener('submit', function(e){
    // Hide Results
    document.getElementById('results').style.display='none';

    // Show Loader
    document.getElementById('loading').style.display='block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();

});

function calculateResults(){
    // UI Variables
    const UIamount= document.getElementById('amount');
    const UIinterest= document.getElementById('interest');
    const UIyears= document.getElementById('years');
    const UImonthlyPayment= document.getElementById('monthly-payment');
    const UItotalPayment= document.getElementById('total-payment');
    const UItotalInterest= document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest= parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments= parseFloat(UIyears.value)*12;

    // Compute the monthly payments
    const x = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    
    if (isFinite(monthly) & monthly>0){
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly*calculatedPayments).toFixed(2);
        UItotalInterest.value= ((monthly*calculatedPayments)-principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display='block';

        // Hide Results
        document.getElementById('loading').style.display='none';


    
    } else {
        showError('Please check your numbers');
    }
}


// Show Error

function showError(error){
    // Hide results
    document.getElementById('results').style.display='none';

    // Hide Results
    document.getElementById('loading').style.display='none';

    // create div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = "alert alert-danger";

    //Create textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Get Elements
    // Card as the parent div
    // we want the errorDiv before the heading in the card so we need to grab the heading as well
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert errorDiv above heading

    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 seconds
    setTimeout(clearError, 1000);
}

// Clear Error in 3s

function clearError(){
    document.querySelector('.alert').remove();
}











