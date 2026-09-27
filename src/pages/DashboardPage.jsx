import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import { removeStorage } from '@/utils/storage';
import { LogOut, Calendar, FileText, Settings, Video } from 'lucide-react';
import { toast } from 'sonner';

const mockAppointments = [
  { id: 1, type: 'upcoming', service: 'Business Vastu Consultation', date: 'Oct 24, 2024 - 10:00 AM IST', link: 'https://zoom.us/mock123' },
  { id: 2, type: 'past', service: 'Numerology Name Correction', date: 'Sep 12, 2024 - 2:00 PM IST', link: null }
];

const mockReports = [
  { id: 1, name: 'Vastu_Audit_Report_2024.pdf', date: 'Sep 15, 2024', size: '2.4 MB' },
  { id: 2, name: 'Numerology_Chart.pdf', date: 'Sep 13, 2024', size: '1.1 MB' }
];

export default function DashboardPage() {
  usePageMeta({ title: 'Dashboard', path: '/portal/dashboard' });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('consultations');

  const handleLogout = () => {
    removeStorage('auth_token');
    toast.success('Logged out successfully');
    navigate('/portal', { replace: true });
  };

  const upcoming = mockAppointments.filter(a => a.type === 'upcoming');
  const past = mockAppointments.filter(a => a.type === 'past');

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-8 items-start">
      {/* Sidebar Nav */}
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0 bg-alt-surface border border-line rounded-xl p-4">
        <div className="mb-6 px-4">
          <h2 className="font-display font-semibold text-xl text-text">Welcome,</h2>
          <p className="text-sm text-muted-text truncate">user@example.com</p>
        </div>
        
        <button
          onClick={() => setActiveTab('consultations')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors focus-visible:outline-accent-text ${
            activeTab === 'consultations' ? 'bg-bg text-accent-text border border-line shadow-sm' : 'text-text hover:bg-bg/50'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Consultations
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors focus-visible:outline-accent-text ${
            activeTab === 'reports' ? 'bg-bg text-accent-text border border-line shadow-sm' : 'text-text hover:bg-bg/50'
          }`}
        >
          <FileText className="w-5 h-5" />
          My Reports
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors focus-visible:outline-accent-text ${
            activeTab === 'settings' ? 'bg-bg text-accent-text border border-line shadow-sm' : 'text-text hover:bg-bg/50'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>

        <div className="mt-8 pt-4 border-t border-line">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg font-medium text-rose-text hover:bg-rose-text/10 transition-colors focus-visible:outline-accent-text"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full min-h-[400px]">
        {activeTab === 'consultations' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h3 className="font-display text-2xl text-text mb-4">Upcoming Consultations</h3>
              {upcoming.length > 0 ? (
                <div className="grid gap-4">
                  {upcoming.map(app => (
                    <div key={app.id} className="bg-bg border border-line rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-lg text-text">{app.service}</h4>
                        <p className="text-muted-text mt-1">{app.date}</p>
                      </div>
                      {app.link && (
                        <a 
                          href={app.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-brand-btn-bg text-brand-btn-text px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity focus-visible:outline-accent-text"
                        >
                          <Video className="w-4 h-4" /> Join Call
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-alt-surface border border-line rounded-lg text-muted-text">
                  No upcoming consultations.
                </div>
              )}
            </div>

            <div>
              <h3 className="font-display text-2xl text-text mb-4">Past Consultations</h3>
              {past.length > 0 ? (
                <div className="grid gap-4">
                  {past.map(app => (
                    <div key={app.id} className="bg-alt-surface border border-line rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-70 hover:opacity-100 transition-opacity">
                      <div>
                        <h4 className="font-semibold text-text">{app.service}</h4>
                        <p className="text-sm text-muted-text mt-1">{app.date}</p>
                      </div>
                      <span className="text-sm font-medium px-3 py-1 bg-bg border border-line rounded-full text-muted-text">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-alt-surface border border-line rounded-lg text-muted-text">
                  No past consultations.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-display text-2xl text-text mb-4">My Reports & Documents</h3>
            <div className="grid gap-4">
              {mockReports.map(report => (
                <div key={report.id} className="bg-bg border border-line rounded-lg p-4 md:p-6 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-alt-surface rounded-full text-accent-text">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text">{report.name}</h4>
                      <p className="text-sm text-muted-text mt-1">{report.date} &bull; {report.size}</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-accent-text hover:underline focus-visible:outline-accent-text">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-display text-2xl text-text mb-4">Account Settings</h3>
            <div className="bg-bg border border-line rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Email Address</label>
                <input 
                  type="email" 
                  disabled 
                  value="user@example.com" 
                  className="w-full max-w-md px-4 py-2 bg-alt-surface border border-line rounded text-muted-text cursor-not-allowed"
                />
                <p className="text-xs text-muted-text mt-2">To change your email, please contact support.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Communication Preferences</label>
                <div className="space-y-3 mt-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-line text-accent-text focus:ring-accent-text bg-alt-surface" />
                    <span className="text-text text-sm">Email reminders for upcoming consultations</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-line text-accent-text focus:ring-accent-text bg-alt-surface" />
                    <span className="text-text text-sm">WhatsApp notifications (if number provided)</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 border-t border-line">
                <button className="bg-brand-btn-bg text-brand-btn-text px-6 py-2 rounded font-medium focus-visible:outline-accent-text hover:opacity-90">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
