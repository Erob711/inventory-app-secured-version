# Improve Security of Inventory App

### What's been improved:
1.  Authentication via Auth0 redirect sign-in
2.  API's now enforce the access of resources based on user roles. 
3. Protection against DDoS (Distributed Denial-of-Service): Rate limiting so that the app doesn't get forced to consume and/or create an indefinite amount of resources.
4. Added Secrets Scanning to CI/CD pipeline with GH actions and a cool light-weight secrets scanning tool called GitGuardian.