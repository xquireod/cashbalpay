// Simple client-side auth - single allowed user
// Allowed credentials (demo): userid: tolman, password: CashBal@2025
const ALLOWED_USER = "tolman";
const ALLOWED_PASS = "CashBal@2025";

const loginBtn = document.getElementById('loginBtn');
const feedback = document.getElementById('feedback');
const userid = document.getElementById('userid');
const password = document.getElementById('password');
const loginCard = document.getElementById('loginCard');
const statementCard = document.getElementById('statementCard');
const dashboardCard = document.getElementById('dashboardCard');
const dateEl = document.getElementById('date');
const copyBtn = document.getElementById('copyBtn');
const printBtn = document.getElementById('printBtn');
const dashboardBtn = document.getElementById('dashboardBtn');
const logoutBtn = document.getElementById('logoutBtn');
const backToStatementBtn = document.getElementById('backToStatementBtn');
const contactAdvisorBtn = document.getElementById('contactAdvisorBtn');
const creditBar = document.getElementById('creditBar');
const creditStatus = document.getElementById('creditStatus');

function showFeedback(msg, error=true){
  feedback.style.display = 'block';
  feedback.textContent = msg;
  feedback.style.color = error ? '#b91c1c' : '#065f46';
  // small shake when error
  if(error){
    loginCard.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}], {duration:360});
  }
}

loginBtn.addEventListener('click', (e) => {
  attemptLogin();
});

password.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') attemptLogin();
});

function attemptLogin(){
  const u = userid.value.trim();
  const p = password.value;
  if(!u || !p){ showFeedback('Please enter both user id and password.'); return; }

  if(u === ALLOWED_USER && p === ALLOWED_PASS){
    // success
    feedback.style.display = 'none';
    loginCard.style.display = 'none';
    statementCard.style.display = 'block';
    dateEl.textContent = new Date().toLocaleDateString();
    // set some dashboard values based on 'credit score' logic
    const creditScorePercent = 40; // simulated low score
    creditBar.style.width = creditScorePercent + '%';
    creditStatus.textContent = 'Below Recommended';
  } else {
    showFeedback('Incorrect credentials. If this is not your account, contact support.');
  }
}

// copy statement
copyBtn?.addEventListener('click', () => {
  const text = `STATEMENT OF ACCOUNT\nDate: ${new Date().toLocaleDateString()}\nTo: Mr. Tolman Brian\n\nDeposit amount: $20,000.00 and $6,000.00\nBalance: $26,000.00\n\nWe confirm your payments of $20,000 and $6,000 are currently held due to a low credit score with financial institutions. Please reach out to your financial advisor immediately.`;
  navigator.clipboard?.writeText(text).then(()=>{
    showFeedback('Statement copied to clipboard.', false);
    setTimeout(()=> feedback.style.display='none', 2200);
  }).catch(()=> showFeedback('Unable to copy to clipboard.'));

});

printBtn?.addEventListener('click', () => {
  window.print();
});

dashboardBtn?.addEventListener('click', () => {
  statementCard.style.display = 'none';
  dashboardCard.style.display = 'block';
});

backToStatementBtn?.addEventListener('click', () => {
  dashboardCard.style.display = 'none';
  statementCard.style.display = 'block';
});

logoutBtn?.addEventListener('click', () => {
  // clear and go back to login
  userid.value=''; password.value='';
  statementCard.style.display = 'none';
  dashboardCard.style.display = 'none';
  loginCard.style.display = 'block';
  showFeedback('You have been logged out.', false);
  setTimeout(()=> feedback.style.display='none', 1800);
});

// window.addEventListener("DOMContentLoaded", () => {
//     const allowed = ["", "index.html", "statement.html", "dashboard.html"];

//     let page = location.pathname.split("/").pop();

//     if (!allowed.includes(page)) {
//         location.replace("index.html");
//     }
// });


contactAdvisorBtn?.addEventListener('click', () => {
  // open a mailto for demo
  const subject = encodeURIComponent('Urgent: Review of Held Funds');
  const body = encodeURIComponent('Hello Advisor,%0D%0A%0D%0AI require assistance regarding held funds on my CashBalPay account. Please advise next steps.%0D%0A%0D%0AThanks.%0D%0A');
  window.location.href = `mailto:advisor@cashbalpay.example?subject=${subject}&body=${body}`;
});

// Accessibility: focus first input
userid.focus();
