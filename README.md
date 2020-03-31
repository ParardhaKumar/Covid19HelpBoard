# Covid19HelpBoard
[https://indiafightscorona.herokuapp.com/](https://indiafightscorona.herokuapp.com/) <br>
COVID19 Help-board &amp; Emergency Reporting Portal for People During Lockdown 

Node Web Application to serve as a unified platform for NGOs throughout India to collaborate and work together to bridge the gap between “demand in emergencies” and “supplies for help” during lockdown.

The application allows for multiple NGOs are individuals willing to help to register and then respond to emergency calls from people currently in quarantine due to ongoing lockdown in a conjunctive manner. 

## Description
The application allows to report any kind of emergency which will be assigned to collaborating NGOs/responders (who will have a login access into the system).

Any user can:
1. Report an emergency, be it of any kind or specify if they have any essential requirements such as Medicines/Rations/Ambulance.
2. View current statistics of the crisis.
3. Get information about the nearest authoritites to contact during an emergency situation.
4. Update themselves about the ongoing pandemic.
5. Suggest an idea which can either be implemented on the app or by the responders/NGOs
6. View any previously submitted ideas.
7. View blogs posted on the website. (Ongoing)
8. Login to post a blog/write-up if they wish to do so. (Ongoing)

The responders can:
1. Assign themselves any case (which has not been assigned to any previous responder).
2. Mark the assigned case as complete or delete them as and where necessary.
3. View cases assigned to them.

## Tools & Frameworks
The application is written using Express Framework and Node Package Manager (for external dependency management).

### Database & Configuration
- MongoDB
- Mongoose
- Git
- Heroku
- Covid19 [API](https://github.com/amodm/api-covid19-in)

### Backend Technologies
- NodeJS
- Express
- Passport JS

### Frontend Technologies
- HTML, CSS, JavaScript
- ejs
- Bootstrap 4

### FlowChart for Responder Journey
![](https://github.com/ParardhaKumar/Covid19HelpBoard/blob/master/screens/NGOFlow.png)

### Screenshots
![](https://github.com/ParardhaKumar/Covid19HelpBoard/blob/master/screens/home.png)

![](https://github.com/ParardhaKumar/Covid19HelpBoard/blob/master/screens/dashboard.png)

![](https://github.com/ParardhaKumar/Covid19HelpBoard/blob/master/screens/login.png)

![](https://github.com/ParardhaKumar/Covid19HelpBoard/blob/master/screens/symptoms.png)

![](https://github.com/ParardhaKumar/Covid19HelpBoard/blob/master/screens/form.png)

## Hosting
The application has been hosted on Heroku [here](https://indiafightscorona.herokuapp.com/)
