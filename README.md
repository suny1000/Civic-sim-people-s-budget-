# CivicSim - The People's Budget

A gamified participatory budgeting web application that allows users to allocate a $100 million city budget and see real-time consequences on city metrics like education, healthcare, infrastructure, and more.

## 🏛️ Features

### Core Functionality
- **Interactive Budget Simulator**: Allocate funds across 8 city departments with real-time impact visualization
- **City Metrics Dashboard**: See how budget decisions affect education quality, public health, infrastructure, safety, environment, and housing
- **AI Budget Advisor**: Get personalized recommendations and explanations for budget decisions
- **User Authentication**: Secure sign-up/login with Supabase Auth
- **Leaderboard System**: Compete with other users and track your civic engagement skills
- **Personal Dashboard**: Track your simulation history, scores, and achievements

### Technical Features
- **Real-time Calculations**: Instant feedback on budget allocation changes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Data Persistence**: Save and load budget simulations
- **Performance Tracking**: Detailed analytics on user engagement and budget effectiveness

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Recharts for data visualization
- **Deployment**: Vercel

## 📊 Database Schema

### Tables
- `profiles`: User profile information
- `budget_simulations`: Saved budget allocations and scores
- `leaderboard_entries`: User rankings and scores

### Security
- Row Level Security (RLS) enabled on all tables
- User data is protected and isolated per user
- Secure authentication flow with email confirmation

## 🎮 How It Works

1. **Budget Allocation**: Users distribute $100M across 8 city departments:
   - Education (schools, teachers, programs)
   - Healthcare (hospitals, clinics, public health)
   - Infrastructure (roads, bridges, transit)
   - Public Safety (police, fire, emergency services)
   - Environment (parks, waste management, sustainability)
   - Housing (affordable housing, homeless services)
   - Arts & Culture (museums, libraries, cultural programs)
   - Economic Development (business support, job training)

2. **Real-time Impact**: As users adjust allocations, city metrics update instantly:
   - Education Quality (graduation rates, school performance)
   - Public Health (healthcare access, population health)
   - Infrastructure Quality (road conditions, transit effectiveness)
   - Safety Index (crime prevention, emergency response)
   - Environmental Quality (air quality, green spaces)
   - Housing Affordability (affordable housing availability)

3. **Scoring System**: Overall city score calculated based on balanced allocation and metric performance

4. **AI Guidance**: Intelligent chatbot provides context-aware budget advice and explanations

## 🏗️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd civicsim
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL scripts in the `scripts/` folder to set up the database schema
   - Get your project URL and anon key from Supabase dashboard

4. **Environment Variables**
   Create a `.env.local` file with:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Database Setup

Run these SQL scripts in your Supabase SQL editor:

1. `scripts/001_create_tables.sql` - Creates the main tables and RLS policies
2. `scripts/002_update_leaderboard.sql` - Sets up leaderboard ranking system

## 🎯 Usage Guide

### For Citizens
1. **Sign Up**: Create an account to save your simulations
2. **Explore**: Try the budget simulator without an account first
3. **Allocate**: Distribute the $100M budget across city departments
4. **Learn**: Use the AI advisor to understand budget trade-offs
5. **Compete**: Check the leaderboard to see how you rank
6. **Improve**: Iterate on your budget to achieve higher scores

### For Educators
- Use CivicSim in civics, economics, or public policy courses
- Assign budget challenges with specific constraints
- Compare student approaches and facilitate discussions
- Track engagement through the dashboard analytics

### For Local Governments
- Engage citizens in budget discussions
- Demonstrate the complexity of municipal budgeting
- Collect input on community priorities
- Educate residents about city services and trade-offs

## 🔮 Roadmap

### Coming Soon Features
- **Community Hub** (Q2 2024): Discussion forums and strategy sharing
- **Real City Data** (Q3 2024): Integration with actual municipal budgets
- **Multiplayer Mode** (Q4 2024): Collaborative and competitive budgeting
- **Advanced Analytics** (Q1 2025): Multi-year impact modeling

### Potential Enhancements
- Mobile app versions
- Integration with local government APIs
- Multi-language support
- Accessibility improvements
- Advanced AI features

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style and standards
- Pull request process
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Municipal budget data sources
- Civic engagement research
- Open source community
- Beta testers and early users

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Feature Requests**: Submit via GitHub Discussions
- **Contact**: [Your contact information]

---

**CivicSim** - Empowering citizens through gamified participatory budgeting.

Built with ❤️ for civic engagement and democratic participation.
