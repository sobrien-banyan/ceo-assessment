

export const pdfHelper = (overallScore, grade, results) => {
let jsonObject = {
    insertInto: "IHFCHAssessmentReportv5",
    insertData : {
        overallScore: overallScore + "%",
        grade,
        results: []
    }
  };

    const responses = {
        "for_1_2": {
            less_than_4: [`According to the Society for Human Resource Management (SHRM), employees with past convictions are likely to have longer tenure, perform their job the same or better than workers without a criminal record, and are just as dependable or more dependable than their counterparts without convictions. Additionally, nearly two-thirds of HR Professionals surveyed state they are willing to work with individuals with past convictions.`,
            `Make sure that you are following all applicable Ban the Box laws. According to the National Employment Law Project (NELP), a total of 37 states (including the District of Columbia) and 150 cities and counties adopted "Ban the Box" laws, so it is crucial for employers to familiarize themselves with the law. The premise of the law is for employers to prioritize their candidates' qualifications and avoid the stigma or bias of seeing a conviction history in one's record. The local, state, and federal government support the fair-chance hire policy, so employers must be educated.`,
            `In November 2015, former President Obama endorsed Ban-the-Box by leading federal agencies to focus on an applicant's conviction record later in the hiring process. In December 2019, the "Fair Chance to Compete for Jobs Act of 2019" became law as a subsection of the National Defense Authorization Effect which took effect in December 2021. This law prohibits contractors and federal agencies from obtaining an applicant’s previous record until after the applicant receives a conditional offer for the job.`,
            `It is imperative to weigh the legal implications of fair chance hiring when recruiting candidates. Methods to advertise job opportunities for candidates with past convictions can come in many ways. For example selecting "fair chance employer" for job application sites such as Indeed and Linkedin and utilizing job boards specifically for this population, like Honest Jobs.  Furthermore, fair chance employers can reach out by advertising in community colleges,  vocational training programs, or by partnering with local Workforce Development agencies.  Many individuals that are participating in these programs are eager to put their newly acquired skills to use.`],
            equal_to_or_greater_than_4: [`You are a fair chance hirer! Have you thought about telling other employers in your network about the success that you have had? Share on LinkedIn, attend your local Chamber of Commerce meeting, and discuss your hiring and recruitment practices. As a credible messenger, you have a lot of impact and influence with other business owners or hirers! Hiring people with past convictions should not be your best-kept secret. Be proud of your accomplishments and tell others about them.`]
        },
        "for_3_4": {
            less_than_4: [`Starting a new job for anyone is difficult and nerve-wracking and it may be exceptionally difficult for those returning to the workforce. People returning from incarceration are adjusting back into society, and are becoming familiar with new norms, customs, and culture. With some support, these individuals will thrive! Furthermore, HR professionals believe the quality of hire of workers with past convictions is the same or better than workers without convictions. Undoubtedly hiring them is good for your place of business! `,
            `As a fair chance employer, you should consider the use of inclusive and human-centered language to bring a sense of welcome and belonging to your workplace. One of the initial considerations you should consider as a fair chance hirer is the use of human-centered language. Inclusive and humanistic language in the workplace is crucial for employees with former convictions to have a sense of welcoming and belonging in the workplace. Dehumanizing labels to avoid include criminals, prisoners, convicts, delinquents, felons, and inmates. Even language that use "ex" with words like "ex-convicts'' can still harm and stigmatize employees impacted by the justice system. It is always best to use person-centered language when working with all employees including employees with past convictions, like “person with a past conviction” or “job seeker with a past conviction”.`,
            `Onboarding is a time when new employees become welcomed into the new workplace and are provided with the tools they need to become successful in their new role. Onboarding is key because it helps with productivity, assimilation, and integration into a new environment. Purposeful onboarding can transform ideal candidates into top-performing employees. `,
            `Communication, flexibility, and transparency are important in the onboarding process as many employees with past convictions may require occasional accommodations such as checking in with a probation or parole officer. Provide these reasonable accommodations as you would to any employee that has an extenuating circumstance. Rest assured these individuals will be so thankful, as would any employee, if their employer is willing to provide them with the support they need to be successful at not only employment but also navigating through life circumstances. `,`Ideas to welcome employees and make them feel comfortable include a welcome letter, a packet for new hire paperwork, technology setup instructions, a company notebook, a company t-shirt, an office map, the first-week schedule, and any employee support groups. It is also recommended that during the employee's first 3 months, there should be regularly scheduled 1:1 meetings for check-ins to see how the new employee is adjusting to the new work environment and to evaluate if any accommodations may be needed.This will ensure new employees are aware of support and expectations and will give them a sense of being part of the team.`],
            equal_to_or_greater_than_4: [`You have made significant strides to ensure that your workplace is welcoming! Considerations such as an individualized onboarding plan, and inclusive language signal to your new employees that they matter and are welcome!`,
            `Have you thought about eliciting feedback from your current workplace to explore additional ways you can transform your onboarding experience to be even more effective? Those with direct and lived experience may have impactful feedback to further inform your company's operations. Not only will this help the development of onboarding, but it also signals to them that their opinion and experience matter!`]
        },
        "for_5_6": {
            less_than_4: [`A study of 1.3 million military enlistees found that enlistees with past convictions had superior performance compared to those with no convictions. What does this mean for you as an employer? It means that these individuals are skilled and talented and when given the opportunity can grow within your company. As with any employee, making specific investments in talent development has big dividends.`,
            `One of the most important aspects of employee growth is to learn about their personal goals and aspirations. In addition to formal talent development opportunities via training and other offerings, having routine conversations through one-on-one meetings about professional development may increase employee engagement, success, and retention, building a crucial foundation for high performance.`,
            `A practical way to help employees grow is by providing job shadowing opportunities. After you learn more about your employee's interests, purposefully set up opportunities for your employees to experience roles that mirror their passion. An individual may not know that a particular job even exists. You have the opportunity to significantly impact someone's life by listening and creating opportunities. Investing in talent development positions employees for career advancement and can help your company advance its mission.`],
            equal_to_or_greater_than_4: [`Your workplace understands the importance of talent development for your employees. Employees that experience growth opportunities feel a strong sense of purpose and belonging at work. Way to go!`,
            `Now that you have gotten the basics of talent development down, what other creative ways can you set your employees up for success? Take a pulse survey with your current workforce to evaluate what has been meaningful to them and what they believe might be more impactful for them.`]
        },
        "for_7_8": {
            less_than_4: [`Critical causes for high employee turnover include poor compensation, insufficient employee benefits, lack of career development opportunities, poor company culture, lack of recognition or rewards, and lack of connectivity with the company.`,
            `Employees with past convictions desire a sense of security and a culture conducive to learning and growth. Employee retention starts at onboarding. All employees must be given adequate training and clearly understand expectations and norms. Recognizing employees that have contributed to the company can positively impact the company culture and thereby increase retention. One way to do this is to provide bi-annual performance reviews linked to compensation increases. Employees with past convictions have usually experienced high stigmatization, so giving positive feedback and recognition goes a long way. Lastly, consider non-traditional benefits such as 0% interest loans to obtain life-stabilizing measures such as a deposit on an apartment or a vehicle These benefits can significantly reduce barriers to employment and help your employee stay around for the long term.`],
            equal_to_or_greater_than_4: [`Your workplace is a model for other companies seeking to improve their fair chance hiring practices. You have created a culture conducive to growth and development, and your employees want to stick around.`,
            `Have you considered ways to use your power as an employer to do social good? Because of your status in the community, not only can you encourage other employers in your network to hire job seekers with past convictions, but you can also help mitigate collateral consequences that impact people's ability to reintegrate or achieve economic mobility successfully. In your sector, are there specific regulations that unfairly ban people from employment due to required licensing? Talk to your elected officials and encourage them to oppose these harmful practices that often marginalize people with past convictions. Never underestimate your power to do good`,
            `In your sector, are there specific regulations that unfairly ban people from employment due to required licensing? Talk to your elected officials and encourage them to oppose these harmful practices that often marginalize people with past convictions. Never underestimate your power to do good!`]
        },
    };


    
    for (let key in results) {
        if (key === "1" || key === "3" || key === "5" || key === "7") {
            continue;
        }
        
        let resultObject = {
            section: results[key]['section'],
            questionsAndAnswers: [
                {
                    question: results[key]['question'],
                    answer: results[key]['answer']
                },
                {
                    question: results[parseInt(key) - 1]['question'],
                    answer: results[parseInt(key) - 1]['answer']
                }
            ]
        };

        if (key === "2") {
            resultObject.score = (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value'])/16*100).toFixed(0) + "%";

            if (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value']) < 4) {
                resultObject.feedback = responses.for_1_2.less_than_4;
            } else {
                resultObject.feedback = responses.for_1_2.equal_to_or_greater_than_4;
            }

            jsonObject.insertData.results.push(resultObject);
        }

        if (key === "4") {
            resultObject.score = (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value'])/12*100).toFixed(0) + "%";

            if (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value']) < 4) {
                resultObject.feedback = responses.for_3_4.less_than_4;
            } else {
                resultObject.feedback = responses.for_3_4.equal_to_or_greater_than_4;
            }

            jsonObject.insertData.results.push(resultObject);
        }

        if (key === "6") {
            resultObject.score = (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value'])/12*100).toFixed(0) + "%";

            if (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value']) < 4) {
                resultObject.feedback = responses.for_5_6.less_than_4;
            } else {
                resultObject.feedback = responses.for_5_6.equal_to_or_greater_than_4;
            }

            jsonObject.insertData.results.push(resultObject);
        }

        if (key === "8") {
            resultObject.score = (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value'])/12*100).toFixed(0) + "%";

            if (parseInt(results[key]['value']) + parseInt(results[parseInt(key) - 1]['value']) < 4) {
                resultObject.feedback = responses.for_7_8.less_than_4;
            } else {
                resultObject.feedback = responses.for_7_8.equal_to_or_greater_than_4;
            }

            jsonObject.insertData.results.push(resultObject);
        }
    };

  // Return the JSON object
  return jsonObject;
};
