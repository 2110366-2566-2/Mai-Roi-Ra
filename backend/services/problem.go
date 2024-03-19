package services

import (
	"fmt"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type ProblemService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IProblemService interface {
	CreateProblem(req *st.CreateProblemRequest) (*st.CreateProblemResponse, error)
	GetProblemDetailById(req *st.GetProblemDetailByIdRequest) (*st.GetProblemDetailByIdResponse, error)
	GetProblemLists(req *st.GetProblemListsRequest) (*st.GetProblemListsResponse, error)
	UpdateProblem(req *st.UpdateProblemRequest) (*st.ProblemResponse, error)
	DeleteProblemById(req *st.DeleteProblemByIdRequest) (*st.ProblemResponse, error)
	SendReplyEmail(problemId string) error
	SendEmailToAdmin(problemType string, description string) error
}

func NewProblemService(repoGateway repository.RepositoryGateway) IProblemService {
	return &ProblemService{
		RepositoryGateway: repoGateway,
	}
}

func (s *ProblemService) CreateProblem(req *st.CreateProblemRequest) (*st.CreateProblemResponse, error) {
	log.Println("[Service: CreateProblem] Called")
	res, err := s.RepositoryGateway.ProblemRepository.CreateProblem(req)
	if err != nil {
		return nil, err
	}
	if err = s.SendEmailToAdmin(res.Problem, res.Description); err != nil {
		return nil, err
	}
	return &st.CreateProblemResponse{
		ProblemId:   res.ProblemId,
		UserId:      res.UserId,
		Problem:     res.Problem,
		Description: res.Description,
		Status:      res.Status,
	}, nil
}

func (s *ProblemService) GetProblemDetailById(req *st.GetProblemDetailByIdRequest) (*st.GetProblemDetailByIdResponse, error) {
	log.Println("[Service: GetProblemDetailById] Called")
	res, err := s.RepositoryGateway.ProblemRepository.GetProblemDetailById(req.ProblemId)
	if err != nil {
		return nil, err
	}
	adminUsername := ""
	if res.AdminUsername != nil {
		adminUsername = *res.AdminUsername
	}

	reply := ""
	if res.Reply != nil {
		reply = *res.Reply
	}

	return &st.GetProblemDetailByIdResponse{
		ProblemId:     res.ProblemId,
		AdminUsername: adminUsername,
		Problem:       res.Problem,
		Description:   res.Description,
		Reply:         reply,
		Status:        res.Status,
	}, nil
}

func (s *ProblemService) GetProblemLists(req *st.GetProblemListsRequest) (*st.GetProblemListsResponse, error) {
	log.Println("[Service: GetProblemsByStatus] Called")
	problemLists, err := s.RepositoryGateway.ProblemRepository.GetProblemLists(req)
	if err != nil {
		return nil, err
	}
	res := &st.GetProblemListsResponse{
		ProblemLists: make([]st.ProblemList, 0),
	}

	for _, v := range problemLists {
		adminUsername := ""
		if v.AdminUsername != nil {
			adminUsername = *v.AdminUsername
		}

		reply := ""
		if v.Reply != nil {
			reply = *v.Reply
		}
		problem := st.ProblemList{
			ProblemId:     v.ProblemId,
			AdminUsername: adminUsername,
			Problem:       v.Problem,
			Description:   v.Description,
			Reply:         reply,
			Status:        v.Status,
		}

		res.ProblemLists = append(res.ProblemLists, problem)
	}
	return res, nil
}

func (s *ProblemService) UpdateProblem(req *st.UpdateProblemRequest) (*st.ProblemResponse, error) {
	log.Println("[Service: UpdateProblem] Called")
	res, err := s.RepositoryGateway.ProblemRepository.UpdateProblem(req)
	if err != nil {
		return nil, err
	}

	if(req.Status == "Replied") {
		err := s.SendReplyEmail(req.ProblemId)
		if err != nil {
			return nil, err
		}
	}

	return res, nil
}

func (s *ProblemService) DeleteProblemById(req *st.DeleteProblemByIdRequest) (*st.ProblemResponse, error) {
	log.Println("[Service: DeleteProblemById] Called")
	res, err := s.RepositoryGateway.ProblemRepository.DeleteProblemById(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (s *ProblemService) SendReplyEmail(problemId string) error {
	log.Println("[Service: SendReplyEmail]: Called")
	resProblem , err := s.RepositoryGateway.ProblemRepository.GetProblemDetailById(problemId)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return err
	}

	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return err
	}
	log.Println("Config path from Gmail:", cfg)

	subject := fmt.Sprintf(`Problem : %s Replied`, resProblem.ProblemId)
	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	reqUser := &st.GetUserByUserIdRequest{
		UserId: resProblem.UserId,
	}
	resUser, err := s.RepositoryGateway.UserRepository.GetUserByID(reqUser)
	if err != nil {
		return err
	}
	email := ""
	if resUser.Email != nil {
		email = *resUser.Email
	}
	if email != "" {
		to = append(to, email)
	} else {
		return err
	}

	contentHTML := fmt.Sprintf(`
	<html>
	<head>
		<style>
			body {
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				margin: 40px auto;
				max-width: 600px;
				color: #333333;
			}
			h3 {
				font-size: 24px;
				margin-bottom: 20px;
				color: #333333;
			}
			p {
				margin-bottom: 20px;
				color: #666666;
			}
			.signature {
				margin-top: 20px;
				font-style: italic;
			}
		</style>
	</head>
	<body>
		<h3>Your Problem ID : %s has been replied</h3>
		<p>Hello %s,</p>
		<p>%s</p>
		<p class="signature">Best regards,<br>%s (Admin),<br>Mai-Roi-Ra team</p>
	</body>
	</html>
	`, resProblem.ProblemId, resUser.Username, *resProblem.Reply, *resProblem.AdminUsername)

	if err = sender.SendEmail(subject, "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return err
	}
	return nil
}

func (s *ProblemService) SendEmailToAdmin(problemType string, description string) error {
	log.Println("[Service: SendEmailToAdmin] Called")
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return err
	}
	log.Println("Config path from Gmail:", cfg)
	resAdmins, err := s.RepositoryGateway.UserRepository.GetAllAdmins()
	if err != nil {
		return nil
	}

	adminEmails := make([]string, 0)
	for _, v := range resAdmins {
		if v.Email != nil {
			adminEmails = append(adminEmails, *v.Email)
		}
	}

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	subject := fmt.Sprintf(`%s problem`, problemType)
	to := adminEmails
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	contentHTML := fmt.Sprintf(`
	<html>
	<head>
		<style>
			body {
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				margin: 40px auto;
				max-width: 600px;
				color: #333333;
			}
			h3 {
				font-size: 24px;
				margin-bottom: 20px;
				color: #333333;
			}
			p {
				margin-bottom: 20px;
				color: #666666;
			}
			.signature {
				margin-top: 20px;
				font-style: italic;
			}
		</style>
	</head>
	<body>
		<h3>Dear admins,</h3>
		<p> User has reported a <bold>%s<bold> problem.</p>
		<p>%s</p>
		<p class="signature">Best regards, Mai-Roi-Ra auto-message</p>
	</body>
	</html>
`, problemType, description)
	if err = sender.SendEmail(subject, "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return err
	}
	return nil
}
