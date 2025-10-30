#!/bin/bash

# Навигационное меню для всех страниц
NAV='    <nav class="nav-sticky" id="navigation">
        <div class="container">
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link NAV_STATUS"><i class="fas fa-chart-line"></i> Статусы 30.10.2025</a></li>
                <li><a href="realized.html" class="nav-link NAV_REALIZED">Реализовано</a></li>
                <li><a href="improvements.html" class="nav-link NAV_IMPROVEMENTS">Доработки 2026</a></li>
                <li><a href="other-types.html" class="nav-link NAV_OTHER">Другие виды</a></li>
                <li><a href="vacation-scenarios.html" class="nav-link NAV_VACATION">Сценарии отпуска</a></li>
                <li><a href="comparison.html" class="nav-link NAV_COMPARISON">Сравнение</a></li>
            </ul>
        </div>
    </nav>'

echo "Created navigation menu"
